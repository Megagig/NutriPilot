// test-connection.js
const axios = require('axios');

// Read from .env
require('dotenv').config();

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

console.log('🔍 Testing Backend Connection\n');
console.log('═══════════════════════════════════════');
console.log('API URL:', API_URL);
console.log('═══════════════════════════════════════\n');

async function testConnection() {
  try {
    // Test 1: Basic connectivity
    console.log('Test 1: Checking if backend is reachable...');
    try {
      const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
      console.log('✅ Backend is reachable');
      console.log('   Response:', response.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('❌ Connection refused - Backend is not running!');
        console.log('\n💡 Solution:');
        console.log('   cd backend');
        console.log('   npm run dev\n');
        return;
      } else if (error.code === 'ETIMEDOUT') {
        console.log('❌ Connection timeout - Wrong IP address?');
        console.log('\n💡 Check your .env file:');
        console.log('   EXPO_PUBLIC_API_URL=' + API_URL);
        console.log('\n   For Android Emulator: http://10.0.2.2:5000');
        console.log('   For iOS Simulator: http://localhost:5000');
        console.log('   For Physical Device: http://YOUR_IP:5000\n');
        return;
      } else if (error.response?.status === 404) {
        console.log('⚠️  Backend reachable but /health endpoint not found');
        console.log('   This is OK - backend is running');
      } else {
        console.log('⚠️  Unexpected error:', error.message);
      }
    }

    console.log('\nTest 2: Testing login endpoint...');
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: 'admin@nutripilot.com',
          password: 'Admin@123456'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      console.log('✅ Login successful!');
      console.log('\nResponse:');
      console.log('─────────────────────────────────────');
      console.log('Message:', response.data.message);
      console.log('User:', response.data.user);
      console.log('Access Token:', response.data.accessToken ? 'Present ✅' : 'Missing ❌');
      console.log('─────────────────────────────────────\n');

      console.log('🎉 Everything is working correctly!');
      console.log('\nIf the app still shows "Invalid credentials":');
      console.log('1. Restart the Expo app');
      console.log('2. Clear app cache');
      console.log('3. Check for typos in email/password\n');

    } catch (error) {
      if (error.response) {
        console.log('❌ Login failed with status:', error.response.status);
        console.log('   Message:', error.response.data.message || error.response.data);
        
        if (error.response.status === 400) {
          console.log('\n💡 This means backend received the request but credentials are wrong');
          console.log('   Run: cd backend && npm run test:login');
        } else if (error.response.status === 403) {
          console.log('\n💡 Email not verified');
          console.log('   Run: cd backend && npm run test:login');
        }
      } else {
        console.log('❌ Request failed:', error.message);
      }
    }

  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

testConnection();
