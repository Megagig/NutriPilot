# 🔨 Rebuild Required - Your App Has Old API URL

## 🎯 The Issue

Your EAS build has the **old API URL** baked in. The `.env` changes won't take effect until you rebuild.

**Current situation:**
- ✅ Backend works: `http://192.168.8.167:5000`
- ✅ Credentials correct: `admin@nutripilot.com` / `Admin@123456`
- ✅ Connection test passes
- ❌ App still has old URL from build time

---

## 🚀 Solution: Rebuild the App

### Step 1: Verify .env is Correct

```bash
cat .env
```

Should show:
```
EXPO_PUBLIC_API_URL=http://192.168.8.167:5000
```

✅ Already correct!

### Step 2: Build New APK

```bash
# Make sure you're in frontend directory
cd frontend

# Build for Android
eas build --profile development --platform android --local
```

**Note:** Using `--local` builds on your machine (faster, no queue)

### Step 3: Install New APK

1. Build will create an APK file
2. Transfer to your phone
3. Install it
4. Open and login!

---

## ⚡ Alternative: Quick Test with Expo Go

If you want to test immediately without rebuilding:

### Step 1: Install Expo Go

Download from Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent

### Step 2: Start Dev Server

```bash
cd frontend
npm start
```

### Step 3: Scan QR Code

1. Open Expo Go app
2. Scan the QR code from terminal
3. App will load with new .env
4. Try login - should work!

**Note:** This is for testing only. For production, use EAS build.

---

## 🎯 Recommended: Build Locally (Fastest)

```bash
# Install EAS CLI if not already
npm install -g eas-cli

# Login to EAS
eas login

# Build locally (faster than cloud build)
eas build --profile development --platform android --local

# Wait 5-10 minutes
# Install the APK on your device
# Login should work!
```

---

## 📱 What Each Option Does

### EAS Build (Production-ready)
- ✅ Standalone APK
- ✅ Works without dev server
- ✅ Can distribute to others
- ⏱️ Takes 5-15 minutes

### Expo Go (Quick Testing)
- ✅ Instant testing
- ✅ No build needed
- ✅ Hot reload works
- ❌ Requires dev server running
- ❌ Can't distribute

---

## 🔍 Check What Type of Build You Have

Look at your installed app:

**If it says "NutriPilot"** → EAS Build (needs rebuild)
**If it says "Expo Go"** → Can connect to dev server

---

## ✅ Quick Commands

```bash
# Option 1: Build locally (recommended)
cd frontend
eas build --profile development --platform android --local

# Option 2: Build on EAS cloud
eas build --profile development --platform android

# Option 3: Test with Expo Go
npm start
# Then scan QR code in Expo Go app
```

---

## 🆘 If Build Fails

### "eas command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Local build not supported"
```bash
# Use cloud build instead
eas build --profile development --platform android
```

---

## 💡 Pro Tip: Development Workflow

For active development:

1. **Build dev client once:**
   ```bash
   eas build --profile development --platform android
   ```

2. **Then use dev server:**
   ```bash
   npm start
   ```

3. **App connects to dev server automatically**
   - Changes reflect immediately
   - No rebuild needed for .env changes!

---

<p align="center">
  <strong>Bottom line: You need to rebuild the app! 🔨</strong><br>
  Choose your method above and rebuild with the new API URL.
</p>
