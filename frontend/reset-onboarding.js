#!/usr/bin/env node

/**
 * Quick script to add a reset onboarding button to your profile
 * This is for testing purposes only
 */

const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, 'app', '(tabs)', 'profile.tsx');

console.log('📝 Adding reset onboarding button to profile...');

try {
  let content = fs.readFileSync(profilePath, 'utf8');
  
  // Check if already added
  if (content.includes('resetOnboarding')) {
    console.log('✅ Reset button already exists in profile!');
    process.exit(0);
  }
  
  // Add import
  if (!content.includes('onboardingService')) {
    content = content.replace(
      "import authService from '../../services/authService';",
      "import authService from '../../services/authService';\nimport onboardingService from '../../services/onboardingService';"
    );
  }
  
  // Find the logout button and add reset button before it
  const resetButton = `
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: '#FFF3E0' }]}
            onPress={async () => {
              Alert.alert(
                'Reset Onboarding',
                'This will clear your onboarding data and show the onboarding screens again. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                      await onboardingService.clearOnboardingData();
                      Alert.alert('Success', 'Onboarding data cleared! Restart the app to see onboarding screens.');
                    },
                  },
                ]
              );
            }}
          >
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFE0B2' }]}>
                <Ionicons name="refresh" size={24} color="#FF9800" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Reset Onboarding</Text>
                <Text style={styles.menuSubtitle}>For testing purposes</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </View>
          </TouchableOpacity>
`;
  
  // Add before the logout button
  content = content.replace(
    /(<TouchableOpacity[^>]*onPress={handleLogout})/,
    resetButton + '\n          $1'
  );
  
  fs.writeFileSync(profilePath, content, 'utf8');
  console.log('✅ Reset onboarding button added to profile!');
  console.log('📱 Restart your app to see the new button in the Profile tab');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
