#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking NutriPilot Setup...\n');

let allGood = true;

// Check backend directory
console.log('📁 Checking backend directory...');
if (fs.existsSync('./backend')) {
  console.log('   ✅ Backend directory exists');
  
  // Check backend node_modules
  if (fs.existsSync('./backend/node_modules')) {
    console.log('   ✅ Backend dependencies installed');
  } else {
    console.log('   ❌ Backend dependencies not installed');
    console.log('      Run: cd backend && npm install');
    allGood = false;
  }
  
  // Check backend .env
  if (fs.existsSync('./backend/.env')) {
    console.log('   ✅ Backend .env file exists');
    
    // Read and check critical env vars
    const envContent = fs.readFileSync('./backend/.env', 'utf8');
    const hasMongoUri = envContent.includes('MONGO_URI=') && !envContent.includes('MONGO_URI=your_');
    const hasSmtpUser = envContent.includes('SMTP_USER=') && !envContent.includes('SMTP_USER=your_');
    
    if (!hasMongoUri) {
      console.log('   ⚠️  MONGO_URI needs to be configured in backend/.env');
      allGood = false;
    }
    
    if (!hasSmtpUser) {
      console.log('   ⚠️  SMTP credentials need to be configured in backend/.env');
      console.log('      Sign up at https://mailtrap.io for free SMTP testing');
    }
  } else {
    console.log('   ❌ Backend .env file missing');
    console.log('      Run: cp backend/.env.example backend/.env');
    allGood = false;
  }
} else {
  console.log('   ❌ Backend directory not found');
  console.log('      The authentication backend should be in ./backend');
  allGood = false;
}

console.log('\n📱 Checking frontend setup...');

// Check frontend node_modules
if (fs.existsSync('./node_modules')) {
  console.log('   ✅ Frontend dependencies installed');
} else {
  console.log('   ❌ Frontend dependencies not installed');
  console.log('      Run: npm install');
  allGood = false;
}

// Check frontend .env
if (fs.existsSync('./.env')) {
  console.log('   ✅ Frontend .env file exists');
  
  const envContent = fs.readFileSync('./.env', 'utf8');
  if (envContent.includes('EXPO_PUBLIC_API_URL=')) {
    console.log('   ✅ API URL configured');
  } else {
    console.log('   ⚠️  EXPO_PUBLIC_API_URL not configured in .env');
    allGood = false;
  }
} else {
  console.log('   ❌ Frontend .env file missing');
  console.log('      Run: cp .env.example .env');
  allGood = false;
}

// Check required files
console.log('\n📄 Checking required files...');
const requiredFiles = [
  'app/(auth)/signin.tsx',
  'app/(auth)/signup.tsx',
  'app/(tabs)/index.tsx',
  'services/authService.ts',
  'services/api.ts',
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} missing`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('\n✅ Setup looks good! You can start the app:\n');
  console.log('   1. Start backend:  cd backend && npm run dev');
  console.log('   2. Start frontend: npm start\n');
} else {
  console.log('\n⚠️  Some issues found. Please fix them and run this script again.\n');
  console.log('📚 For help, check:');
  console.log('   - QUICKSTART.md for quick setup');
  console.log('   - SETUP.md for detailed instructions\n');
}

console.log('='.repeat(50) + '\n');
