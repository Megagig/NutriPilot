# 🔧 Troubleshooting Login Issues

## 🎯 Quick Diagnosis

Run this command to test your credentials:

```bash
cd backend
npm run test:login
```

This will check:
- ✅ If user exists in database
- ✅ If password is correct
- ✅ If email is verified
- ✅ If 2FA is enabled

---

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid email or password"

**Possible Causes:**
1. User doesn't exist in database
2. Wrong password
3. Email not matching (case sensitivity)

**Solutions:**

**A. Check if admin exists:**
```bash
mongosh
use nutripilot_db
db.users.find({ email: "admin@nutripilot.com" })
```

**B. If user doesn't exist, create it:**
```bash
cd backend
npm run seed:admin
```

**C. If user exists but password wrong, recreate:**
```bash
# Delete user
mongosh
use nutripilot_db
db.users.deleteOne({ email: "admin@nutripilot.com" })
exit

# Create again
cd backend
npm run seed:admin
```

---

### Issue 2: "Please verify your email before logging in"

**Cause:** Email is not verified (isEmailVerified = false)

**Solution: Manually verify email in database:**
```bash
mongosh
use nutripilot_db
db.users.updateOne(
  { email: "admin@nutripilot.com" },
  { $set: { isEmailVerified: true } }
)
exit
```

**Or recreate admin (auto-verified):**
```bash
cd backend
npm run seed:admin
```

---

### Issue 3: Frontend can't connect to backend

**Symptoms:**
- Network error
- Timeout
- Connection refused

**Check 1: Is backend running?**
```bash
cd backend
npm run dev

# Should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

**Check 2: Frontend .env configuration**

Open `frontend/.env`:

**For iOS Simulator:**
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**For Android Emulator:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

**For Physical Device:**
```env
# Use your computer's IP address
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```

**Find your IP:**
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

**Check 3: Test backend directly**
```bash
# Test if backend is accessible
curl http://localhost:5000/health

# Or test login endpoint
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

---

### Issue 4: Backend returns 403 Forbidden

**Cause:** Email not verified

**Solution:** See Issue 2 above

---

### Issue 5: Backend returns 400 with 2FA message

**Cause:** Two-factor authentication is enabled

**Solution A: Disable 2FA:**
```bash
mongosh
use nutripilot_db
db.users.updateOne(
  { email: "admin@nutripilot.com" },
  { $set: { twoFactorEnabled: false, twoFactorSecret: null } }
)
exit
```

**Solution B: Provide 2FA code when logging in**
(Frontend needs to be updated to support this)

---

### Issue 6: CORS errors in browser/app

**Symptoms:**
- "CORS policy" error
- "Access-Control-Allow-Origin" error

**Solution: Check backend CORS configuration**

The backend should have CORS enabled. Check `backend/src/app.ts`:

```typescript
import cors from 'cors';

app.use(cors({
  origin: true, // or specify your frontend URL
  credentials: true
}));
```

---

### Issue 7: MongoDB connection error

**Symptoms:**
- "MongoDB connection error"
- Backend won't start

**Solution A: Start MongoDB locally**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Solution B: Use MongoDB Atlas**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nutripilot_db
   ```

---

## 🔍 Debugging Steps

### Step 1: Run the test script
```bash
cd backend
npm run test:login
```

### Step 2: Check backend logs
```bash
cd backend
npm run dev

# Watch for errors when you try to login
```

### Step 3: Check frontend logs
```bash
# In Expo terminal, watch for errors
# Or check React Native debugger
```

### Step 4: Test with curl
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}' \
  -v
```

### Step 5: Check database directly
```bash
mongosh
use nutripilot_db
db.users.find({ email: "admin@nutripilot.com" }).pretty()
```

---

## 📋 Checklist

Before asking for help, verify:

- [ ] Backend is running (`npm run dev`)
- [ ] MongoDB is running
- [ ] Admin user exists (`npm run test:login`)
- [ ] Email is verified (isEmailVerified: true)
- [ ] Password is correct
- [ ] Frontend .env has correct API URL
- [ ] Can access backend from browser/curl
- [ ] No CORS errors in console
- [ ] No network errors in app

---

## 🎯 Quick Reset (Nuclear Option)

If nothing works, start fresh:

```bash
# 1. Stop everything
# Ctrl+C on backend and frontend

# 2. Clear database
mongosh
use nutripilot_db
db.users.deleteMany({})
exit

# 3. Recreate admin
cd backend
npm run seed:admin

# 4. Restart backend
npm run dev

# 5. Restart frontend
cd ../frontend
npm start

# 6. Try login again
```

---

## 🔐 Test Credentials

**Default Admin:**
```
Email:    admin@nutripilot.com
Password: Admin@123456
```

**Test Regular User:**
Register a new user through the app to test regular flow.

---

## 📊 Expected API Response

**Successful Login:**
```json
{
  "message": "Login successfully done.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@nutripilot.com",
    "role": "admin",
    "isEmailVerified": true,
    "twoFactorEnabled": false
  }
}
```

**Failed Login (Wrong Password):**
```json
{
  "message": "Invalid email or password."
}
```

**Failed Login (Email Not Verified):**
```json
{
  "message": "Please verify your email before logging in."
}
```

---

## 💡 Pro Tips

1. **Always check backend logs first** - They show the actual error
2. **Use the test script** - `npm run test:login` saves time
3. **Test with curl** - Eliminates frontend issues
4. **Check MongoDB directly** - Verify data is correct
5. **Restart everything** - Sometimes it's just a cache issue

---

## 🆘 Still Not Working?

1. Run `npm run test:login` and share the output
2. Check backend console for errors
3. Share the exact error message from the app
4. Verify your setup:
   - Backend running? ✅
   - MongoDB running? ✅
   - Admin exists? ✅
   - Correct API URL? ✅

---

<p align="center">
  <strong>Most login issues are due to:</strong><br>
  1. Email not verified (run test:login)<br>
  2. Wrong API URL in frontend/.env<br>
  3. Backend not running
</p>
