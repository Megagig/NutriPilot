// src/scripts/createAdmin.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import readline from "readline";
import { hashPassword } from "../lib/hash";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question
function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connected successfully\n");

    console.log("═══════════════════════════════════════");
    console.log("     Create Super Admin User");
    console.log("═══════════════════════════════════════\n");

    // Get admin details from user
    const name = await question("👤 Enter admin name: ");
    const email = await question("📧 Enter admin email: ");
    const password = await question("🔑 Enter admin password (min 8 chars): ");

    // Validate inputs
    if (!name || !email || !password) {
      console.log("\n❌ All fields are required!");
      rl.close();
      process.exit(1);
    }

    if (password.length < 8) {
      console.log("\n❌ Password must be at least 8 characters!");
      rl.close();
      process.exit(1);
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("\n⚠️  User with this email already exists!");
      console.log("📧 Email:", existingUser.email);
      console.log("🔐 Role:", existingUser.role);
      rl.close();
      process.exit(1);
    }

    // Hash the password
    console.log("\n🔐 Hashing password...");
    const passwordHash = await hashPassword(password);

    // Create admin user
    console.log("👤 Creating admin user...");
    const admin = await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
      isEmailVerified: true,
      twoFactorEnabled: false,
      tokenVersion: 0,
    });

    console.log("\n✅ Admin user created successfully!\n");
    console.log("═══════════════════════════════════════");
    console.log("📧 Email:    ", admin.email);
    console.log("👤 Name:     ", admin.name);
    console.log("🔐 Role:     ", admin.role);
    console.log("✉️  Verified:", admin.isEmailVerified ? "Yes" : "No");
    console.log("═══════════════════════════════════════");
    console.log("\n🎉 You can now login with these credentials!\n");

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error creating admin:", error);
    rl.close();
    process.exit(1);
  }
}

// Run the script
createAdmin();
