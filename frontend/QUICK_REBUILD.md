# ⚡ Quick Rebuild Instructions

## 🎯 Your Situation

You have an EAS Build installed with the **old API URL** baked in.  
You need to rebuild with the **new API URL**: `http://10.179.137.36:5000`

---

## 🚀 Option 1: Quick Rebuild (15 minutes)

### Step 1: Verify .env
```bash
cat .env
```
Should show: `EXPO_PUBLIC_API_URL=http://10.179.137.36:5000` ✅

### Step 2: Build New APK
```bash
eas build --profile development --platform android
```

### Step 3: Wait for Build
- Takes 5-15 minutes
- You'll get a download link

### Step 4: Install & Test
- Download APK
- Install on device
- Login with:
  - Email: `admin@nutripilot.com`
  - Password: `Admin@123456`

---

## 🎨 Option 2: Use Dev Client (Recommended for Development)

This is **MUCH FASTER** for development because you only build once!

### Step 1: Build Dev Client (One Time)
```bash
eas build --profile development --platform android
```

### Step 2: Install Dev Client
- Download and install the APK
- This is your "dev client" app

### Step 3: Start Dev Server
```bash
npm start
```

### Step 4: Connect App to Dev Server
1. Open the dev client app
2. Scan QR code from terminal
3. App loads from dev server
4. **Changes to .env work immediately!** 🎉

### Benefits:
- ✅ No rebuild needed for .env changes
- ✅ Hot reload works
- ✅ Faster development
- ✅ Can debug easily

---

## 🔧 What's the Difference?

### Regular Build (Option 1):
- `.env` is baked into the app
- Need to rebuild for any .env change
- Good for: Final testing, distribution

### Dev Client (Option 2):
- App connects to dev server
- `.env` loaded from dev server
- Just restart dev server for changes
- Good for: Active development

---

## 💡 Recommended Approach

**For now (testing):**
```bash
# 1. Build dev client
eas build --profile development --platform android

# 2. Install it

# 3. Run dev server
npm start

# 4. Scan QR code in app

# 5. Test login - should work!
```

**For production later:**
```bash
# When ready to deploy
eas build --profile production --platform android
```

---

## ✅ Quick Commands

```bash
# Check .env
cat .env

# Build for Android
eas build --profile development --platform android

# Build for iOS
eas build --profile development --platform ios

# Start dev server (for dev client)
npm start

# Test connection
npm run test:connection
```

---

## 🆘 Need Help?

See full guide: [EAS_REBUILD_GUIDE.md](./EAS_REBUILD_GUIDE.md)

---

<p align="center">
  <strong>TL;DR: Build dev client once, then use dev server! 🚀</strong>
</p>
