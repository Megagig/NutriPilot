# 🔨 EAS Build - Rebuild with New API URL

## 🎯 The Issue

You're using an **EAS Build** (compiled APK/IPA), which means the `.env` file was baked into the app at build time. To use the new API URL, you need to rebuild.

**Current API URL in build:** `http://10.0.2.2:5000` (old)  
**New API URL needed:** `http://10.179.137.36:5000` (your IP)

---

## 🚀 Quick Rebuild (Recommended)

### For Android (Development Build)

```bash
# Make sure .env has the correct URL
cat .env
# Should show: EXPO_PUBLIC_API_URL=http://10.179.137.36:5000

# Build for Android
eas build --profile development --platform android

# Wait for build to complete (5-10 minutes)
# Download and install the new APK
```

### For iOS (Development Build)

```bash
# Make sure .env has the correct URL
cat .env
# Should show: EXPO_PUBLIC_API_URL=http://10.179.137.36:5000

# Build for iOS
eas build --profile development --platform ios

# Wait for build to complete
# Install via TestFlight or direct install
```

---

## 🎨 Alternative: Use Expo Dev Client (Faster)

Instead of rebuilding every time, use Expo Dev Client which allows hot reloading:

### Step 1: Build Dev Client Once

```bash
# Android
eas build --profile development --platform android

# iOS
eas build --profile development --platform ios
```

### Step 2: Start Dev Server

```bash
npm start
```

### Step 3: Connect App to Dev Server

1. Open the installed dev client app
2. Scan QR code or enter URL manually
3. App will load from dev server
4. Changes to `.env` will work without rebuild!

---

## 📋 Complete Rebuild Steps

### Step 1: Verify .env Configuration

```bash
cat .env
```

Should show:
```env
EXPO_PUBLIC_API_URL=http://10.179.137.36:5000
```

### Step 2: Login to EAS (if not already)

```bash
npx eas login
```

### Step 3: Build the App

**For Android:**
```bash
eas build --profile development --platform android
```

**For iOS:**
```bash
eas build --profile development --platform ios
```

### Step 4: Wait for Build

- Build takes 5-15 minutes
- You'll get a notification when done
- Download link will be provided

### Step 5: Install New Build

**Android:**
- Download APK from EAS dashboard
- Install on your device
- Allow "Install from unknown sources" if needed

**iOS:**
- Install via TestFlight, or
- Download and install directly (requires Apple Developer account)

### Step 6: Test Login

1. Open the new build
2. Go to Sign In
3. Enter:
   - Email: `admin@nutripilot.com`
   - Password: `Admin@123456`
4. Should work! 🎉

---

## 🔧 Build Profiles Explained

### Development Profile
```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  }
}
```
- Best for testing
- Includes dev tools
- Can connect to dev server
- Faster iteration

### Preview Profile
```json
{
  "preview": {
    "distribution": "internal"
  }
}
```
- Production-like build
- For testing before release
- No dev tools

### Production Profile
```json
{
  "production": {
    "autoIncrement": true
  }
}
```
- Final release build
- Optimized and minified
- For app stores

---

## 💡 Pro Tips

### Tip 1: Use Development Build for Testing

Development builds allow you to:
- Connect to dev server
- Hot reload changes
- Debug easily
- Change API URL without rebuild (using dev server)

```bash
# Build once
eas build --profile development --platform android

# Then just run dev server
npm start

# App connects to dev server automatically
```

### Tip 2: Use Environment Variables in EAS

Create `eas.json` with environment variables:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_API_URL": "http://10.179.137.36:5000"
      }
    }
  }
}
```

### Tip 3: Build for Multiple Environments

```bash
# Development (your local IP)
eas build --profile development --platform android

# Staging (staging server)
eas build --profile preview --platform android

# Production (production server)
eas build --profile production --platform android
```

---

## 🎯 Recommended Workflow

### For Active Development:

1. **Build dev client once:**
   ```bash
   eas build --profile development --platform android
   ```

2. **Install on device**

3. **Run dev server:**
   ```bash
   npm start
   ```

4. **App connects to dev server**
   - Changes reflect immediately
   - Can update `.env` and restart dev server
   - No rebuild needed!

### For Testing/Distribution:

1. **Update `.env` with final API URL**

2. **Build preview/production:**
   ```bash
   eas build --profile preview --platform android
   ```

3. **Distribute to testers**

---

## 🔍 Check Current Build Configuration

### View Build Details:
```bash
eas build:list
```

### View Project Configuration:
```bash
eas project:info
```

### View Build Logs:
```bash
eas build:view [BUILD_ID]
```

---

## 🆘 Troubleshooting

### "Build failed"

**Check logs:**
```bash
eas build:view [BUILD_ID]
```

**Common issues:**
- Missing credentials
- Invalid configuration
- Network issues

### "Can't install APK"

**Enable unknown sources:**
1. Settings → Security
2. Enable "Install from unknown sources"
3. Try installing again

### "App crashes on launch"

**Check build profile:**
- Use `development` profile for testing
- Check logs in EAS dashboard
- Verify `.env` configuration

### "Still shows old API URL"

**Verify build includes new .env:**
1. Check when build was created
2. Ensure `.env` was updated before build
3. Rebuild if needed

---

## 📚 Quick Reference

### Build Commands:
```bash
# Android development
eas build --profile development --platform android

# iOS development
eas build --profile development --platform ios

# Both platforms
eas build --profile development --platform all

# Preview build
eas build --profile preview --platform android

# Production build
eas build --profile production --platform android
```

### Useful Commands:
```bash
# Login to EAS
npx eas login

# Check build status
eas build:list

# View project info
eas project:info

# Start dev server
npm start

# Clear cache and start
npx expo start -c
```

---

## ✅ Checklist Before Building

- [ ] `.env` has correct API URL
- [ ] Backend is running and accessible
- [ ] Tested connection: `npm run test:connection`
- [ ] Logged into EAS: `npx eas login`
- [ ] Correct build profile selected
- [ ] Have stable internet connection

---

## 🎉 Success!

Once rebuilt with the correct API URL:

1. ✅ App will connect to `http://10.179.137.36:5000`
2. ✅ Login will work with admin credentials
3. ✅ All API calls will go to your backend

**Login credentials:**
```
Email:    admin@nutripilot.com
Password: Admin@123456
```

---

<p align="center">
  <strong>For fastest development, use dev client + dev server!</strong><br>
  Build once, then just run <code>npm start</code> 🚀
</p>
