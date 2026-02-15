# 🔧 Fix: Invalid Credentials / Connection Issue

## 🎯 Problem Identified

Your credentials are **CORRECT** ✅, but the frontend **CANNOT CONNECT** to the backend ❌

**Current Configuration:**
```
Frontend .env: http://10.0.2.2:5000 (Android Emulator)
```

**Issue:** Connection timeout - frontend can't reach backend

---

## 🚀 Quick Fix (Choose Your Platform)

### Option 1: iOS Simulator

**Update `frontend/.env`:**
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**Restart Expo:**
```bash
# Stop current Expo (Ctrl+C)
npm start
# Press 'i' for iOS
```

---

### Option 2: Android Emulator

**Step 1: Ensure backend is accessible**

The Android emulator uses `10.0.2.2` to access the host machine's `localhost`.

**Step 2: Update `frontend/.env`:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

**Step 3: Check if backend is running:**
```bash
cd backend
npm run dev

# Should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

**Step 4: Test from your computer:**
```bash
curl http://localhost:5000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

**Step 5: Restart Expo:**
```bash
npm start
# Press 'a' for Android
```

---

### Option 3: Physical Device (Same WiFi)

**Step 1: Find your computer's IP address**

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Look for something like: inet 192.168.1.100
```

**Windows:**
```bash
ipconfig
# Look for IPv4 Address: 192.168.1.100
```

**Step 2: Update `frontend/.env`:**
```env
# Replace with YOUR IP address
EXPO_PUBLIC_API_URL=http://192.168.1.100:5000
```

**Step 3: Ensure firewall allows connections:**

**macOS:**
```bash
# Allow Node.js through firewall
# System Preferences → Security & Privacy → Firewall → Firewall Options
# Allow incoming connections for Node
```

**Windows:**
```bash
# Allow port 5000 through Windows Firewall
netsh advfirewall firewall add rule name="Node Backend" dir=in action=allow protocol=TCP localport=5000
```

**Linux:**
```bash
sudo ufw allow 5000/tcp
```

**Step 4: Restart Expo:**
```bash
npm start
# Scan QR code with Expo Go
```

---

## ✅ Verification Steps

### Step 1: Test Backend Locally
```bash
curl http://localhost:5000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

**Expected Response:**
```json
{
  "message": "Login successfully done.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@nutripilot.com",
    "role": "admin",
    "isEmailVerified": true,
    "twoFactorEnabled": false
  }
}
```

### Step 2: Test Frontend Connection
```bash
cd frontend
npm run test:connection
```

**Expected Output:**
```
✅ Backend is reachable
✅ Login successful!
```

### Step 3: Try Login in App
1. Open NutriPilot app
2. Go to Sign In
3. Enter:
   - Email: `admin@nutripilot.com`
   - Password: `Admin@123456`
4. Click Sign In
5. Should work! 🎉

---

## 🔍 Debugging

### Check 1: Is Backend Running?
```bash
cd backend
npm run dev
```

### Check 2: Can You Access Backend?
```bash
# From your computer
curl http://localhost:5000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

### Check 3: Is .env Loaded?
```bash
cd frontend
cat .env
# Should show: EXPO_PUBLIC_API_URL=...
```

### Check 4: Restart Everything
```bash
# Stop backend (Ctrl+C)
# Stop frontend (Ctrl+C)

# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm start
```

---

## 📋 Platform-Specific Configuration

### iOS Simulator
```env
# frontend/.env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

### Android Emulator
```env
# frontend/.env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

### Physical Device (WiFi)
```env
# frontend/.env
# Replace with your computer's IP
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```

### Expo Go on Phone
```env
# frontend/.env
# Use your computer's IP on same WiFi
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```

---

## 🎯 Complete Fix Workflow

### For iOS Simulator:

```bash
# 1. Update .env
echo "EXPO_PUBLIC_API_URL=http://localhost:5000" > frontend/.env

# 2. Start backend
cd backend
npm run dev

# 3. Start frontend (new terminal)
cd frontend
npm start
# Press 'i'

# 4. Test login
# Email: admin@nutripilot.com
# Password: Admin@123456
```

### For Android Emulator:

```bash
# 1. Update .env
echo "EXPO_PUBLIC_API_URL=http://10.0.2.2:5000" > frontend/.env

# 2. Start backend
cd backend
npm run dev

# 3. Start frontend (new terminal)
cd frontend
npm start
# Press 'a'

# 4. Test login
# Email: admin@nutripilot.com
# Password: Admin@123456
```

### For Physical Device:

```bash
# 1. Find your IP
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example output: inet 192.168.1.100

# 2. Update .env
echo "EXPO_PUBLIC_API_URL=http://192.168.1.100:5000" > frontend/.env

# 3. Start backend
cd backend
npm run dev

# 4. Start frontend (new terminal)
cd frontend
npm start
# Scan QR code

# 5. Test login
# Email: admin@nutripilot.com
# Password: Admin@123456
```

---

## 💡 Pro Tips

1. **Always restart Expo after changing .env**
   - Stop with Ctrl+C
   - Run `npm start` again

2. **Test backend first**
   - Use curl or Postman
   - Verify it works locally

3. **Check firewall**
   - Physical devices need firewall access
   - Allow port 5000

4. **Use correct IP**
   - iOS: localhost
   - Android Emulator: 10.0.2.2
   - Physical Device: Your computer's IP

5. **Same WiFi network**
   - Phone and computer must be on same network
   - Check WiFi settings

---

## 🆘 Still Not Working?

### Run Diagnostics:
```bash
# Test backend credentials
cd backend
npm run test:login

# Test frontend connection
cd frontend
npm run test:connection
```

### Check Logs:
```bash
# Backend logs
cd backend
npm run dev
# Watch for errors when you try to login

# Frontend logs
# Check Expo terminal for errors
```

### Nuclear Option (Start Fresh):
```bash
# 1. Stop everything
# Ctrl+C on all terminals

# 2. Clear Expo cache
cd frontend
npx expo start -c

# 3. Restart backend
cd backend
npm run dev

# 4. Try again
```

---

## ✅ Success Checklist

- [ ] Backend is running (`npm run dev`)
- [ ] MongoDB is connected
- [ ] Admin user exists (`npm run test:login`)
- [ ] Frontend .env has correct API URL
- [ ] Can curl backend successfully
- [ ] Expo restarted after .env change
- [ ] Using correct platform URL
- [ ] Firewall allows connections (physical device)
- [ ] Same WiFi network (physical device)

---

<p align="center">
  <strong>The issue is NOT your credentials!</strong><br>
  It's the connection between frontend and backend.<br>
  Follow the steps above for your platform. 🚀
</p>
