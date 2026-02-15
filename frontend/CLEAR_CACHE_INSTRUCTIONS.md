# Clear Cache and Restart Instructions

## Option 1: Clear Cache and Restart (Recommended)

1. **Stop the current Expo server** (Press Ctrl+C in the terminal where it's running)

2. **Clear all caches:**
   ```bash
   cd frontend
   npx expo start --clear
   ```

3. **On your device/emulator, also clear the app data:**
   - Android: Long press the app → App info → Storage → Clear data
   - iOS Simulator: Device → Erase All Content and Settings
   - Or simply uninstall and reinstall the app

## Option 2: Full Clean (If Option 1 doesn't work)

1. **Stop the Expo server** (Ctrl+C)

2. **Clear all caches and node modules:**
   ```bash
   cd frontend
   rm -rf node_modules
   rm -rf .expo
   rm -rf android/app/build  # if exists
   rm -rf ios/build  # if exists
   npm cache clean --force
   npm install
   npx expo start --clear
   ```

## Option 3: Quick Reload (While server is running)

If the server is already running:
1. Press `r` in the terminal to reload the app
2. Or shake your device and select "Reload"
3. Or press `Ctrl+R` in the Android emulator

## What Changed

The onboarding screen now has:
- ✨ Beautiful purple gradient theme
- 🎨 Smooth animations between steps
- 📊 Visual progress indicators with checkmarks
- 💳 Modern card-based design
- 📱 Fully responsive layout

## Testing the Onboarding

To see the onboarding screen:

1. **For new users:** Simply sign up with a new account
2. **For existing users:** Clear the onboarding data:
   - Open the app
   - Go to Profile (if you can access it)
   - Or manually clear AsyncStorage data

3. **To manually reset onboarding** (add this temporarily to your profile screen):
   ```typescript
   import onboardingService from '../services/onboardingService';
   
   // Add a button with this function
   const resetOnboarding = async () => {
     await onboardingService.clearOnboardingData();
     // Then restart the app or navigate to onboarding
   };
   ```

## Troubleshooting

### If you still see the old design:
1. Make sure you cleared the cache with `--clear` flag
2. Clear app data on your device
3. Check that you're on the latest code (no git changes pending)
4. Restart the Metro bundler completely

### If you get routing errors:
1. Make sure `styles.ts` was renamed to `onboarding.styles.ts`
2. Clear the `.expo` folder
3. Restart with `npx expo start --clear`

### If the app crashes:
1. Check the terminal for error messages
2. Make sure all dependencies are installed
3. Try the "Full Clean" option above
