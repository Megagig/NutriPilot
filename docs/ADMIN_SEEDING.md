# 👤 Super Admin Seeding Guide

## 🎯 Quick Start

Create a Super Admin user to test the authentication system.

### ⚡ Fastest Way (30 seconds)

```bash
cd backend
npm run seed:admin
```

**Login credentials:**
```
Email:    admin@nutripilot.com
Password: Admin@123456
```

---

## 📋 Two Methods Available

### Method 1: Quick Seed (Default Credentials)

**Best for:** Quick testing and development

```bash
cd backend
npm run seed:admin
```

**Creates admin with:**
- 📧 Email: `admin@nutripilot.com`
- 🔑 Password: `Admin@123456`
- 👤 Name: `Super Admin`
- 🔐 Role: `admin`
- ✉️ Email Verified: `Yes`

⚠️ **Remember to change password after first login!**

### Method 2: Interactive Creation (Custom Credentials)

**Best for:** Production or custom setup

```bash
cd backend
npm run create:admin
```

**Prompts you for:**
- 👤 Admin name
- 📧 Admin email
- 🔑 Admin password (min 8 characters)

---

## 🚀 Complete Workflow

### Step 1: Ensure MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# macOS/Linux: mongod
# Or use MongoDB Atlas (cloud)
```

### Step 2: Run Seed Script

```bash
cd backend
npm run seed:admin
```

**Expected output:**
```
🔌 Connecting to MongoDB...
✅ MongoDB connected successfully

🔐 Hashing password...
👤 Creating Super Admin user...

✅ Super Admin created successfully!

═══════════════════════════════════════
📧 Email:     admin@nutripilot.com
🔑 Password:  Admin@123456
👤 Name:      Super Admin
🔐 Role:      admin
✉️  Verified: Yes
═══════════════════════════════════════

⚠️  IMPORTANT: Change the password after first login!
```

### Step 3: Start Backend

```bash
npm run dev
```

### Step 4: Test Login

1. Open NutriPilot app
2. Go to Sign In screen
3. Enter credentials:
   - Email: `admin@nutripilot.com`
   - Password: `Admin@123456`
4. Click "Sign In"
5. You should be logged in as admin!

---

## ✅ Verification

### Check if Admin Exists

**Method 1: Try logging in**
- Open app and login with credentials

**Method 2: Check MongoDB**
```bash
mongosh
use nutripilot_db
db.users.find({ role: "admin" }).pretty()
```

**Method 3: Check backend logs**
- Run seed script and check output

---

## 🔧 Troubleshooting

### "Admin already exists"

**Solution 1: Use existing admin**
```bash
# Just login with the existing credentials
Email: admin@nutripilot.com
Password: Admin@123456
```

**Solution 2: Delete and recreate**
```bash
# Delete existing admin
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
exit

# Run seed again
cd backend
npm run seed:admin
```

**Solution 3: Create with different email**
```bash
cd backend
npm run create:admin
# Enter different email when prompted
```

### "MongoDB connection error"

**Check MongoDB status:**
```bash
# Check if running
mongosh

# Start MongoDB if needed
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB
```

**Check .env configuration:**
```env
# In backend/.env
MONGO_URI=mongodb://localhost:27017/nutripilot_db
```

### "Cannot find module"

**Install dependencies:**
```bash
cd backend
npm install
```

---

## 🔐 Security Best Practices

### Development
- ✅ Use default credentials for quick testing
- ✅ Change password after first login
- ✅ Don't commit credentials to Git
- ✅ Use `.env` for sensitive data

### Production
- ✅ Use `create:admin` with strong password
- ✅ Use unique, secure email
- ✅ Enable 2FA after creation
- ✅ Use password manager
- ✅ Rotate passwords regularly
- ✅ Monitor admin access logs

---

## 📊 Admin Capabilities

| Feature | Regular User | Admin User |
|---------|-------------|------------|
| Sign Up | ✅ Via app | ⚠️ Via seed script |
| Email Verification | ✅ Required | ✅ Pre-verified |
| Role | `user` | `admin` |
| Access Protected Routes | ✅ Yes | ✅ Yes |
| Access Admin Routes | ❌ No | ✅ Yes |
| Manage Users | ❌ No | ✅ Yes (future) |
| View Analytics | ❌ No | ✅ Yes (future) |

---

## 🎯 Testing Scenarios

### Test 1: Admin Login
```bash
# 1. Seed admin
cd backend
npm run seed:admin

# 2. Start backend
npm run dev

# 3. Open app and login
Email: admin@nutripilot.com
Password: Admin@123456

# Expected: Successfully logged in
```

### Test 2: Regular User vs Admin
```bash
# 1. Create regular user via app registration
# 2. Login as regular user
# 3. Logout
# 4. Login as admin
# 5. Compare access levels
```

### Test 3: Password Reset
```bash
# 1. Login as admin
# 2. Go to "Forgot Password"
# 3. Enter admin email
# 4. Check email for reset link
# 5. Reset password
# 6. Login with new password
```

---

## 🔄 Resetting Admin Password

### Method 1: Delete and Recreate (Fastest)
```bash
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
exit

cd backend
npm run seed:admin
```

### Method 2: Use Forgot Password Flow
```bash
# 1. Open app
# 2. Click "Forgot Password"
# 3. Enter: admin@nutripilot.com
# 4. Check email for reset link
# 5. Create new password
```

### Method 3: Update in Database (Advanced)
```bash
# Generate password hash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('NewPassword123', 10).then(console.log)"

# Update in MongoDB
mongosh
use nutripilot_db
db.users.updateOne(
  { email: "admin@nutripilot.com" },
  { $set: { passwordHash: "paste_generated_hash_here" } }
)
```

---

## 📚 Script Details

### seedAdmin.ts
**Location:** `backend/src/scripts/seedAdmin.ts`

**What it does:**
- Connects to MongoDB
- Checks if admin exists
- Hashes password
- Creates admin user
- Displays credentials

**Default values:**
```typescript
{
  name: "Super Admin",
  email: "admin@nutripilot.com",
  password: "Admin@123456",
  role: "admin",
  isEmailVerified: true,
  twoFactorEnabled: false,
  tokenVersion: 0
}
```

### createAdmin.ts
**Location:** `backend/src/scripts/createAdmin.ts`

**What it does:**
- Prompts for user input
- Validates input
- Checks if email exists
- Hashes password
- Creates admin user
- Displays confirmation

**Validation:**
- Name: Required
- Email: Required, valid format
- Password: Min 8 characters

---

## 💡 Pro Tips

1. **Quick testing:** Use `seed:admin` for fast setup
2. **Production:** Use `create:admin` with strong credentials
3. **Check first:** Verify if admin exists before creating
4. **Change password:** Always change default password
5. **Enable 2FA:** Add extra security layer (future feature)
6. **Monitor access:** Keep track of admin logins
7. **Backup credentials:** Store securely in password manager

---

## 🎉 Quick Reference

### Create Default Admin
```bash
cd backend && npm run seed:admin
```

### Create Custom Admin
```bash
cd backend && npm run create:admin
```

### Default Credentials
```
Email: admin@nutripilot.com
Password: Admin@123456
```

### Check if Admin Exists
```bash
mongosh
use nutripilot_db
db.users.find({ role: "admin" })
```

### Delete Admin
```bash
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
```

---

## 📞 Need Help?

- See [backend/SEED_ADMIN_GUIDE.md](../backend/SEED_ADMIN_GUIDE.md) for detailed guide
- See [backend/ADMIN_QUICK_START.md](../backend/ADMIN_QUICK_START.md) for quick reference
- Check [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for environment setup

---

<p align="center">
  <strong>🎉 Your Super Admin is ready to test! 🎉</strong>
</p>

<p align="center">
  <sub>Now you can fully test the authentication system!</sub>
</p>
