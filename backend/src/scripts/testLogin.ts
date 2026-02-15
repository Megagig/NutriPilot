// src/scripts/testLogin.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import { checkPassword } from "../lib/hash";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

async function testLogin() {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connected successfully\n");

    // Test credentials
    const testEmail = "admin@nutripilot.com";
    const testPassword = "Admin@123456";

    console.log("═══════════════════════════════════════");
    console.log("Testing Login Credentials");
    console.log("═══════════════════════════════════════");
    console.log("📧 Email:   ", testEmail);
    console.log("🔑 Password:", testPassword);
    console.log("═══════════════════════════════════════\n");

    // Find user
    console.log("🔍 Looking for user in database...");
    const user = await User.findOne({ email: testEmail.toLowerCase().trim() });

    if (!user) {
      console.log("❌ User not found in database!");
      console.log("\n💡 Solution: Run the seed script:");
      console.log("   npm run seed:admin\n");
      process.exit(1);
    }

    console.log("✅ User found!\n");
    console.log("User Details:");
    console.log("─────────────────────────────────────");
    console.log("ID:              ", user._id);
    console.log("Email:           ", user.email);
    console.log("Name:            ", user.name);
    console.log("Role:            ", user.role);
    console.log("Email Verified:  ", user.isEmailVerified);
    console.log("2FA Enabled:     ", user.twoFactorEnabled);
    console.log("Token Version:   ", user.tokenVersion);
    console.log("Password Hash:   ", user.passwordHash.substring(0, 20) + "...");
    console.log("─────────────────────────────────────\n");

    // Check password
    console.log("🔐 Verifying password...");
    const isPasswordValid = await checkPassword(testPassword, user.passwordHash);

    if (!isPasswordValid) {
      console.log("❌ Password does NOT match!");
      console.log("\n💡 Possible issues:");
      console.log("   1. Wrong password");
      console.log("   2. User was created with different password");
      console.log("   3. Password hash is corrupted\n");
      console.log("🔧 Solution: Delete and recreate admin:");
      console.log("   mongosh");
      console.log("   use nutripilot_db");
      console.log("   db.users.deleteOne({ email: 'admin@nutripilot.com' })");
      console.log("   exit");
      console.log("   npm run seed:admin\n");
      process.exit(1);
    }

    console.log("✅ Password is CORRECT!\n");

    // Check email verification
    if (!user.isEmailVerified) {
      console.log("⚠️  Email is NOT verified!");
      console.log("   The backend will reject login with 403 status\n");
      console.log("🔧 Solution: Verify email manually:");
      console.log("   mongosh");
      console.log("   use nutripilot_db");
      console.log("   db.users.updateOne(");
      console.log("     { email: 'admin@nutripilot.com' },");
      console.log("     { $set: { isEmailVerified: true } }");
      console.log("   )");
      console.log("   exit\n");
    } else {
      console.log("✅ Email is verified!\n");
    }

    // Check 2FA
    if (user.twoFactorEnabled) {
      console.log("⚠️  2FA is ENABLED!");
      console.log("   You need to provide a 2FA code when logging in\n");
    }

    // Final summary
    console.log("═══════════════════════════════════════");
    console.log("Summary");
    console.log("═══════════════════════════════════════");
    console.log("User exists:        ✅");
    console.log("Password correct:   ✅");
    console.log("Email verified:     ", user.isEmailVerified ? "✅" : "❌");
    console.log("2FA required:       ", user.twoFactorEnabled ? "⚠️  Yes" : "✅ No");
    console.log("═══════════════════════════════════════\n");

    if (user.isEmailVerified && !user.twoFactorEnabled) {
      console.log("🎉 Login should work with these credentials!\n");
      console.log("If frontend still shows 'Invalid credentials':");
      console.log("1. Check backend is running: npm run dev");
      console.log("2. Check frontend .env: EXPO_PUBLIC_API_URL");
      console.log("3. Check backend logs for errors");
      console.log("4. Try registering a new user to test\n");
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

// Run the test
testLogin();
