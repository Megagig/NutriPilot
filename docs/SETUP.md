# NutriPilot Setup Guide

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create your `.env` file from the example:
```bash
cp .env.example .env
```

4. Configure your environment variables in `backend/.env`:

```env
NODE_ENV=development
PORT=5000

# MongoDB - Use your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/nutripilot_db
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nutripilot_db

# JWT Secrets - Generate strong random strings
JWT_ACCESS_SECRET=your_strong_access_secret_here
JWT_REFRESH_SECRET=your_strong_refresh_secret_here

# Email Configuration (Mailtrap for development)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In the root directory, install dependencies (if not already done):
```bash
npm install
```

2. Configure your API URL in `.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**Important for iOS Simulator:**
If testing on iOS simulator, use your computer's local IP:
```env
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```

**Important for Android Emulator:**
If testing on Android emulator, use:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## 📧 Email Configuration

### Development (Mailtrap)

1. Sign up for free at [Mailtrap.io](https://mailtrap.io)
2. Get your SMTP credentials from the inbox settings
3. Add them to your `backend/.env` file

### Production

For production, use a real SMTP service:
- **SendGrid**: Popular and reliable
- **AWS SES**: Cost-effective for high volume
- **Mailgun**: Easy to set up
- **Gmail SMTP**: Good for small projects

## 🗄️ Database Setup

### Local MongoDB

1. Install MongoDB locally:
```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Windows
Download from mongodb.com
```

2. Start MongoDB:
```bash
# macOS/Linux
mongod

# Windows
net start MongoDB
```

### MongoDB Atlas (Cloud)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to `backend/.env`

## 🔐 Authentication Features

The backend includes:
- ✅ Email/Password Registration & Login
- ✅ JWT Access & Refresh Tokens
- ✅ Email Verification
- ✅ Password Reset
- ✅ Google OAuth (optional)
- ✅ Two-Factor Authentication (2FA)
- ✅ Role-Based Access Control

## 📱 Testing the App

1. Start both backend and frontend
2. Open the app on your device/simulator
3. Register a new account
4. Check your Mailtrap inbox for verification email
5. Login and explore the app

## 🔧 Troubleshooting

### Cannot connect to backend

- Ensure backend is running on port 5000
- Check your `EXPO_PUBLIC_API_URL` in `.env`
- For physical devices, use your computer's IP address
- For Android emulator, use `10.0.2.2:5000`
- For iOS simulator, use `localhost:5000` or your local IP

### MongoDB connection error

- Ensure MongoDB is running
- Check your `MONGO_URI` in `backend/.env`
- For Atlas, ensure your IP is whitelisted

### Email not sending

- Verify Mailtrap credentials
- Check `backend/.env` SMTP settings
- Look at backend console for error messages

## 📚 API Endpoints

All endpoints are available at `http://localhost:5000`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `GET /auth/verify-email` - Verify email

### User
- `GET /user/me` - Get current user profile

### Admin
- `GET /admin/users` - List all users (admin only)

## 🎨 UI/UX Features

- Modern Dribbble-inspired design
- Smooth gradient animations
- Professional form validation
- Loading states and error handling
- Responsive layouts
- Clean typography and spacing

## 📦 Project Structure

```
nutripilot/
├── app/
│   ├── (auth)/          # Authentication screens
│   │   ├── signin.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/          # Main app screens
│   │   ├── index.tsx    # Home
│   │   ├── scan.tsx     # Food scanner
│   │   └── profile.tsx  # User profile
│   ├── _layout.tsx      # Root layout
│   └── index.tsx        # Entry point
├── services/
│   ├── api.ts           # Axios configuration
│   └── authService.ts   # Authentication service
├── backend/             # Node.js authentication backend
└── assets/              # Images and assets
```

## 🚀 Next Steps

1. Implement food scanning with AI
2. Add calorie tracking features
3. Create nutrition database
4. Build analytics dashboard
5. Add meal planning
6. Implement social features

## 📄 License

ISC License - See backend/README.md for details

## 👨‍💻 Support

For issues with the authentication backend, refer to:
https://github.com/Megagig/nodejs_advanced_auth
