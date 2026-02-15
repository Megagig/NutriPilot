# 🥗 NutriPilot - AI Calories Tracker

<p align="center">
  <img src="./assets/images/logo.png" alt="NutriPilot Logo" width="150"/>
</p>

<h3 align="center">Your AI Nutrition Companion</h3>

<p align="center">
  A modern React Native Expo app with production-ready authentication and AI-powered calorie tracking
</p>

---

## ✨ Features

### 🔐 Advanced Authentication System
- **Email/Password Authentication** - Secure registration and login
- **JWT Token Management** - Access and refresh tokens with automatic rotation
- **Email Verification** - Verify user emails before access
- **Password Reset** - Secure forgot password flow
- **Google OAuth** - Social login integration (ready to configure)
- **Two-Factor Authentication** - TOTP support (backend ready)
- **Role-Based Access Control** - User and admin roles

### 📱 Beautiful UI/UX
- **Dribbble-Inspired Design** - Modern, clean, and professional
- **Gradient Animations** - Smooth visual effects
- **Responsive Layouts** - Works on all screen sizes
- **Loading States** - Professional loading indicators
- **Error Handling** - User-friendly error messages
- **Form Validation** - Real-time input validation

### 🚀 Coming Soon
- AI-powered food recognition
- Calorie tracking and analytics
- Meal planning
- Nutrition database
- Progress tracking
- Social features

---

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **Linear Gradient** - Beautiful gradients

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Google OAuth 2.0** - Social authentication

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB (local or Atlas)
- Expo CLI (optional)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nutripilot
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit backend/.env with your configuration
npm run dev
```

4. **Configure frontend environment**
```bash
# In root directory
cp .env.example .env
# Edit .env with your API URL
```

5. **Start the app**
```bash
npm start
```

For detailed setup instructions, see [SETUP.md](./SETUP.md)

---

## 📁 Project Structure

```
nutripilot/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── signin.tsx       # Sign in screen
│   │   ├── signup.tsx       # Sign up screen
│   │   └── forgot-password.tsx
│   ├── (tabs)/              # Main app tabs
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Home screen
│   │   ├── scan.tsx         # Food scanner
│   │   └── profile.tsx      # User profile
│   ├── _layout.tsx          # Root layout with auth routing
│   └── index.tsx            # Entry point
├── services/
│   ├── api.ts               # Axios instance with interceptors
│   └── authService.ts       # Authentication service
├── backend/                 # Node.js authentication backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Auth & RBAC middleware
│   │   └── lib/             # Utilities
│   └── package.json
├── assets/
│   └── images/              # App images and logo
├── .env.example             # Environment variables template
├── SETUP.md                 # Detailed setup guide
└── package.json
```

---

## 🔐 Authentication Flow

1. **Registration**
   - User signs up with email and password
   - Backend sends verification email
   - User verifies email via link

2. **Login**
   - User logs in with credentials
   - Backend returns access and refresh tokens
   - Tokens stored securely in AsyncStorage

3. **Token Management**
   - Access token used for API requests
   - Automatic token refresh on expiry
   - Logout clears all tokens

4. **Password Reset**
   - User requests password reset
   - Backend sends reset link via email
   - User resets password with token

---

## 🎨 UI Screens

### Authentication Screens
- **Sign In** - Clean login form with email/password
- **Sign Up** - Registration with validation
- **Forgot Password** - Password reset request

### Main App Screens
- **Home** - Dashboard with feature cards
- **Scan** - Food scanning interface (coming soon)
- **Profile** - User profile and settings

---

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://localhost:27017/nutripilot_db

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

### Frontend Environment Variables

Create `.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**Note:** For physical devices, use your computer's IP address instead of localhost.

---

## 📱 Running the App

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Expo Go (Physical Device)
```bash
npm start
# Scan QR code with Expo Go app
```

---

## 🧪 Testing

1. Start the backend server
2. Start the Expo development server
3. Open the app on your device/simulator
4. Test the authentication flow:
   - Register a new account
   - Check Mailtrap for verification email
   - Login with credentials
   - Test forgot password
   - Explore the app

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login with credentials |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| GET | `/auth/verify-email` | Verify email |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/me` | Get current user |

For complete API documentation, see the [backend README](./backend/README.md)

---

## 🎯 Roadmap

- [x] Advanced authentication system
- [x] Beautiful UI/UX design
- [x] JWT token management
- [x] Email verification
- [x] Password reset
- [ ] AI food recognition
- [ ] Calorie tracking
- [ ] Nutrition database
- [ ] Meal planning
- [ ] Analytics dashboard
- [ ] Social features
- [ ] Push notifications

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Built with ❤️ using the advanced authentication boilerplate by [Obi Anthony](https://github.com/Megagig)

Backend Authentication: [nodejs_advanced_auth](https://github.com/Megagig/nodejs_advanced_auth)

---

## 🙏 Acknowledgments

- Authentication backend by Megagig Software Solutions
- UI/UX inspiration from Dribbble
- Icons by Expo Vector Icons
- Built with React Native and Expo

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [SETUP.md](./SETUP.md) guide
- Review the backend [documentation](./backend/README.md)

---

<p align="center">
  <sub>Start your healthy journey with NutriPilot! 🥗</sub>
</p>
