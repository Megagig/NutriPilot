import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import authService from '../services/authService';

interface CustomDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export default function CustomDrawer({ visible, onClose }: CustomDrawerProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (visible) {
      loadUserData();
    }
  }, [visible]);

  const loadUserData = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userData = await authService.getStoredUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              onClose();
              router.replace('/(auth)/signin');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogin = () => {
    onClose();
    router.push('/(auth)/signin');
  };

  const handleSignup = () => {
    onClose();
    router.push('/(auth)/signup');
  };

  const navigateTo = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        
        <View style={styles.drawer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>

              {isAuthenticated ? (
                <View style={styles.userInfo}>
                  <View style={styles.avatarContainer}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                      style={styles.avatar}
                    >
                      <Ionicons name="person" size={40} color="#fff" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.userName}>{user?.name || 'User'}</Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                  {user?.isEmailVerified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.guestInfo}>
                  <Ionicons name="person-circle-outline" size={80} color="#fff" />
                  <Text style={styles.guestTitle}>Welcome to NutriPilot</Text>
                  <Text style={styles.guestSubtitle}>Sign in to get started</Text>
                </View>
              )}
            </LinearGradient>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {isAuthenticated ? (
                <>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('/(tabs)')}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="home" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Home</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('/(tabs)/profile')}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="person" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Profile</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('/(tabs)/scan')}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="camera" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Scan Food</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="fitness" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Fitness Goals</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="notifications" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Notifications</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="settings" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Settings</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="help-circle" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Help & Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="shield-checkmark" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Privacy Policy</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  {/* Logout Button */}
                  <TouchableOpacity
                    style={styles.logoutButtonContainer}
                    onPress={handleLogout}
                  >
                    <LinearGradient
                      colors={['#FF6B6B', '#EE5A6F']}
                      style={styles.logoutButton}
                    >
                      <Ionicons name="log-out-outline" size={24} color="#fff" />
                      <Text style={styles.logoutText}>Logout</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('/(tabs)')}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="home" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Home</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="information-circle" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>About</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name="help-circle" size={22} color="#667eea" />
                    </View>
                    <Text style={styles.menuText}>Help</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>

                  {/* Login Button */}
                  <TouchableOpacity
                    style={styles.loginButtonContainer}
                    onPress={handleLogin}
                  >
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.loginButton}
                    >
                      <Ionicons name="log-in-outline" size={24} color="#fff" />
                      <Text style={styles.loginText}>Sign In</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Signup Link */}
                  <TouchableOpacity style={styles.signupLink} onPress={handleSignup}>
                    <Text style={styles.signupLinkText}>
                      Don't have an account?{' '}
                      <Text style={styles.signupLinkBold}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              <Text style={styles.version}>Version 1.0.0</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    width: '80%',
    maxWidth: 320,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  guestInfo: {
    alignItems: 'center',
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  guestSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  logoutButtonContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  loginButtonContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  loginText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  signupLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  signupLinkText: {
    fontSize: 14,
    color: '#666',
  },
  signupLinkBold: {
    fontWeight: '700',
    color: '#667eea',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 24,
  },
});
