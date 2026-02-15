// src/scripts/seedAdmin.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import { hashPassword } from "../lib/hash";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

// Super Admin credentials
const SUPER_ADMIN = {
  name: "Super Admin",
  email: "admin@nutripilot.com",
  password: "Admin@123456", // Change this to a secure password
  role: "admin" as const,
  isEmailVerified: true,
  twoFactorEnabled: false,
  tokenVersion: 0,
};

async function seedSuperAdmin() {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connected successfully\n");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: SUPER_ADMIN.email });

    if (existingAdmin) {
      console.log("⚠️  Super Admin already exists!");
      console.log("📧 Email:", existingAdmin.email);
      console.log("👤 Name:", existingAdmin.name);
      console.log("🔐 Role:", existingAdmin.role);
      console.log("\n💡 To reset password, delete the user first or use a different email.\n");
      process.exit(0);
    }

    // Hash the password
    console.log("🔐 Hashing password...");
    const passwordHash = await hashPassword(SUPER_ADMIN.password);

    // Create Super Admin user
    console.log("👤 Creating Super Admin user...");
    const admin = await User.create({
      name: SUPER_ADMIN.name,
      email: SUPER_ADMIN.email,
      passwordHash,
      role: SUPER_ADMIN.role,
      isEmailVerified: SUPER_ADMIN.isEmailVerified,
      twoFactorEnabled: SUPER_ADMIN.twoFactorEnabled,
      tokenVersion: SUPER_ADMIN.tokenVersion,
    });

    console.log("\n✅ Super Admin created successfully!\n");
    console.log("═══════════════════════════════════════");
    console.log("📧 Email:    ", admin.email);
    console.log("🔑 Password: ", SUPER_ADMIN.password);
    console.log("👤 Name:     ", admin.name);
    console.log("🔐 Role:     ", admin.role);
    console.log("✉️  Verified:", admin.isEmailVerified ? "Yes" : "No");
    console.log("═══════════════════════════════════════");
    console.log("\n⚠️  IMPORTANT: Change the password after first login!\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding Super Admin:", error);
    process.exit(1);
  }
}

// Run the seeder
seedSuperAdmin();
