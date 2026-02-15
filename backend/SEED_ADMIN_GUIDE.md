# 👤 Super Admin Seeding Guide

This guide explains how to create a Super Admin user for testing the authentication system.

---

## 🎯 Two Methods Available

### Method 1: Quick Seed (Default Credentials)
- ✅ Fast and easy
- ✅ Uses predefined credentials
- ⚠️ Remember to change password after first login

### Method 2: Interactive Creation (Custom Credentials)
- ✅ Choose your own credentials
- ✅ More secure
- ✅ No need to change password later

---

## 🚀 Method 1: Quick Seed (Recommended for Testing)

### Step 1: Run the Seed Script

```bash
cd backend
npm run seed:admin
```

### Step 2: Default Credentials

The script will create an admin with these credentials:

```
📧 Email:    admin@nutripilot.com
🔑 Password: Admin@123456
👤 Name:     Super Admin
🔐 Role:     admin
✉️  Verified: Yes
```

### Step 3: Login

1. Open your NutriPilot app
2. Go to Sign In
3. Enter:
   - Email: `admin@nutripilot.com`
   - Password: `Admin@123456`
4. You're in!

### Step 4: Change Password (Important!)

After first login:
1. Go to Profile
2. Change your password
3. Use a strong, unique password

---

## 🎨 Method 2: Interactive Creation (Custom Credentials)

### Step 1: Run the Interactive Script

```bash
cd backend
npm run create:admin
```

### Step 2: Enter Your Details

The script will prompt you:

```
👤 Enter admin name: John Doe
📧 Enter admin email: john@nutripilot.com
🔑 Enter admin password (min 8 chars): YourSecurePassword123!
```

### Step 3: Confirmation

You'll see:

```
✅ Admin user created successfully!

═══════════════════════════════════════
📧 Email:     john@nutripilot.com
👤 Name:      John Doe
🔐 Role:      admin
✉️  Verified: Yes
═══════════════════════════════════════

🎉 You can now login with these credentials!
```

### Step 4: Login

Use the credentials you just created to login to the app.

---

## 📋 What the Scripts Do

### seedAdmin.ts
```typescript
Creates admin with:
- Email: admin@nutripilot.com
- Password: Admin@123456
- Role: admin
- Email Verified: true
- 2FA: disabled
```

### createAdmin.ts
```typescript
Prompts for:
- Custom name
- Custom email
- Custom password (min 8 chars)
Then creates admin with those credentials
```

---

## ✅ Verification

### Check if Admin Exists

You can verify the admin was created by:

1. **Try logging in** with the credentials
2. **Check MongoDB** directly:
   ```bash
   mongosh
   use nutripilot_db
   db.users.find({ role: "admin" })
   ```

3. **Check backend logs** when running the seed script

---

## 🔧 Troubleshooting

### "Admin already exists"

If you see this message:
```
⚠️  Super Admin already exists!
📧 Email: admin@nutripilot.com
```

**Solution 1: Use the existing admin**
- Just login with the existing credentials

**Solution 2: Delete and recreate**
```bash
# Connect to MongoDB
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
exit

# Run seed script again
npm run seed:admin
```

**Solution 3: Create with different email**
```bash
npm run create:admin
# Enter a different email
```

### "MongoDB connection error"

**Check if MongoDB is running:**
```bash
# macOS/Linux
mongod

# Or check if service is running
sudo systemctl status mongod
```

**Check your .env file:**
```env
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

### For Development
- ✅ Use the default credentials for quick testing
- ✅ Change password after first login
- ✅ Don't commit credentials to Git

### For Production
- ✅ Use `create:admin` with strong password
- ✅ Use unique email address
- ✅ Enable 2FA after creation
- ✅ Use password manager
- ✅ Rotate passwords regularly

---

## 📊 Admin vs Regular User

| Feature | Regular User | Admin User |
|---------|-------------|------------|
| Registration | Via app | Via seed script |
| Email Verification | Required | Pre-verified |
| Role | `user` | `admin` |
| Access Admin Routes | ❌ No | ✅ Yes |
| Manage Users | ❌ No | ✅ Yes |

---

## 🎯 Testing Authentication Flow

### Test 1: Admin Login
```bash
# 1. Seed admin
npm run seed:admin

# 2. Start backend
npm run dev

# 3. Open app and login with:
Email: admin@nutripilot.com
Password: Admin@123456
```

### Test 2: Regular User Registration
```bash
# 1. Start backend
npm run dev

# 2. Open app
# 3. Click "Sign Up"
# 4. Register with your email
# 5. Check email for verification
```

### Test 3: Admin Routes (Future)
```bash
# Once you implement admin routes:
# 1. Login as admin
# 2. Access /admin/users
# 3. View all users
```

---

## 🔄 Resetting Admin Password

### Method 1: Delete and Recreate
```bash
# Delete admin
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
exit

# Create new admin
npm run seed:admin
```

### Method 2: Use Forgot Password Flow
```bash
# 1. Open app
# 2. Click "Forgot Password"
# 3. Enter admin email
# 4. Check email for reset link
# 5. Reset password
```

### Method 3: Update in Database (Advanced)
```bash
# Generate new password hash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('NewPassword123', 10).then(console.log)"

# Update in MongoDB
mongosh
use nutripilot_db
db.users.updateOne(
  { email: "admin@nutripilot.com" },
  { $set: { passwordHash: "paste_hash_here" } }
)
```

---

## 📚 Related Files

- `backend/src/scripts/seedAdmin.ts` - Quick seed script
- `backend/src/scripts/createAdmin.ts` - Interactive creation
- `backend/src/models/user.model.ts` - User schema
- `backend/src/lib/hash.ts` - Password hashing
- `backend/package.json` - NPM scripts

---

## 🎉 Quick Reference

### Seed Default Admin
```bash
cd backend
npm run seed:admin
```

### Create Custom Admin
```bash
cd backend
npm run create:admin
```

### Default Credentials
```
Email: admin@nutripilot.com
Password: Admin@123456
```

### Login in App
```
1. Open NutriPilot app
2. Click "Sign In"
3. Enter credentials
4. Test authentication!
```

---

## 💡 Pro Tips

1. **Use default for quick testing**
   ```bash
   npm run seed:admin
   ```

2. **Use custom for production**
   ```bash
   npm run create:admin
   ```

3. **Check if admin exists first**
   ```bash
   mongosh
   use nutripilot_db
   db.users.find({ role: "admin" })
   ```

4. **Always change default password**
   - After first login
   - Use strong password
   - Enable 2FA

5. **Keep credentials secure**
   - Don't share
   - Don't commit to Git
   - Use password manager

---

<p align="center">
  <strong>🎉 Your Super Admin is ready! 🎉</strong>
</p>

<p align="center">
  <sub>Now you can test the complete authentication flow!</sub>
</p>
