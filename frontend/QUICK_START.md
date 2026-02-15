# 🚀 Quick Start - See the New Onboarding Design

## Step 1: Stop Current Server
Press `Ctrl+C` in the terminal where Expo is running

## Step 2: Clear Cache & Restart
```bash
cd frontend
npx expo start --clear
```

## Step 3: Reload App
Once the server starts:
- Press `r` in the terminal to reload
- Or shake your device and tap "Reload"

## Step 4: See the Onboarding

### Option A: Sign Up with New Account
1. Create a new account
2. You'll automatically see the new onboarding screens

### Option B: Reset Onboarding for Existing Account
1. Run this command to add a reset button:
   ```bash
   node reset-onboarding.js
   ```
2. Reload the app
3. Go to Profile tab
4. Tap "Reset Onboarding" button
5. Restart the app

### Option C: Manual Reset (Quick)
Add this code temporarily anywhere in your app:
```typescript
import onboardingService from './services/onboardingService';

// Call this function
await onboardingService.clearOnboardingData();
// Then restart the app
```

## What You'll See

The new onboarding has:
- 🎨 **Beautiful purple gradient** header
- ✨ **Smooth fade animations** between steps
- 📊 **Progress indicators** with checkmarks
- 💳 **Modern card design** with shadows
- 🎯 **Visual feedback** on selections
- 📱 **Fully responsive** layout

## Troubleshooting

### Still seeing old design?
```bash
# Full clean
rm -rf .expo
rm -rf node_modules/.cache
npx expo start --clear
```

### App not loading?
```bash
# Check for errors in terminal
# Make sure all files are saved
# Try restarting your device/emulator
```

### Route warning about styles.ts?
The file has been renamed to `onboarding.styles.ts` - this should be fixed now.

## Need Help?
Check `CLEAR_CACHE_INSTRUCTIONS.md` for detailed troubleshooting steps.
