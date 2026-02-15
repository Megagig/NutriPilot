# 🎉 Welcome to NutriPilot!

Your AI-powered nutrition companion with production-ready authentication is ready to go!

---

## ✅ What's Been Set Up

### 🔐 Advanced Authentication System
- ✅ Email/Password registration and login
- ✅ JWT token management (access + refresh tokens)
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Secure token storage with AsyncStorage
- ✅ Automatic token refresh
- ✅ Google OAuth ready (just needs configuration)
- ✅ Two-factor authentication (backend ready)

### 🎨 Beautiful UI/UX
- ✅ Dribbble-inspired modern design
- ✅ Smooth gradient animations
- ✅ Professional sign-in screen
- ✅ Professional sign-up screen
- ✅ Forgot password screen
- ✅ Home dashboard
- ✅ Profile screen
- ✅ Food scanner placeholder

### 🏗️ Project Structure
```
nutripilot/
├── app/
│   ├── (auth)/              ← Authentication screens
│   │   ├── signin.tsx       ← Beautiful sign-in UI
│   │   ├── signup.tsx       ← Beautiful sign-up UI
│   │   └── forgot-password.tsx
│   ├── (tabs)/              ← Main app screens
│   │   ├── index.tsx        ← Home dashboard
│   │   ├── scan.tsx         ← Food scanner
│   │   └── profile.tsx      ← User profile
│   └── _layout.tsx          ← Auth routing logic
├── services/
│   ├── api.ts               ← Axios with auto token refresh
│   └── authService.ts       ← All auth methods
├── backend/                 ← Production-ready Node.js backend
│   ├── src/
│   │   ├── controllers/     ← Auth logic
│   │   ├── models/          ← User model
│   │   ├── routes/          ← API endpoints
│   │   └── middlewares/     ← Auth & RBAC
│   └── .env                 ← Backend config (needs SMTP)
└── .env                     ← Frontend config (ready!)
```

---

## 🚀 Next Steps (3 Minutes)

### Step 1: Configure Email (Optional but Recommended)

To test email verification and password reset:

1. Go to https://mailtrap.io and sign up (free)
2. Get your SMTP credentials
3. Open `backend/.env`
4. Update these lines:
   ```env
   SMTP_USER=your_mailtrap_username
   SMTP_PASS=your_mailtrap_password
   ```

**Skip this for now?** The app will work, but email features won't send emails.

### Step 2: Start the Backend

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

**MongoDB not running?** See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for MongoDB setup.

### Step 3: Start the App

Open another terminal and run:
```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Scan QR code with Expo Go on your phone

### Step 4: Test It Out!

1. **Register** a new account
2. **Login** with your credentials
3. Explore the beautiful UI
4. Check your Mailtrap inbox for emails (if configured)

---

## 📱 Platform-Specific Setup

### Testing on Physical Device?

Update `.env` in the root directory:

**Find your computer's IP:**
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

**Update `.env`:**
```env
EXPO_PUBLIC_API_URL=http://YOUR_IP_HERE:5000
```

Example: `http://192.168.1.100:5000`

### Testing on Android Emulator?

Update `.env`:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

---

## 🎨 What You'll See

### Sign In Screen
- Clean, modern design with gradients
- Email and password inputs with icons
- Show/hide password toggle
- Forgot password link
- Google sign-in button (ready for OAuth)
- Sign up link

### Sign Up Screen
- Full name, email, password fields
- Password confirmation
- Real-time validation
- Terms of service
- Beautiful success messages

### Home Screen
- Welcome message
- Feature cards
- Clean navigation

### Profile Screen
- User information
- Settings menu
- Logout functionality

---

## 🔧 Available Commands

```bash
# Check if everything is set up correctly
npm run check-setup

# Start the frontend
npm start

# Start the backend (from root)
npm run backend

# Start iOS simulator
npm run ios

# Start Android emulator
npm run android

# Run linter
npm run lint
```

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)** - Environment variables explained
- **[README.md](./README.md)** - Full project documentation
- **[backend/README.md](./backend/README.md)** - Backend documentation

---

## 🎯 What's Next?

Now that authentication is working, you can build:

1. **AI Food Recognition**
   - Integrate with food recognition API
   - Camera functionality
   - Image processing

2. **Calorie Tracking**
   - Daily calorie goals
   - Meal logging
   - Nutrition breakdown

3. **Analytics Dashboard**
   - Charts and graphs
   - Progress tracking
   - Weekly/monthly reports

4. **Meal Planning**
   - Recipe suggestions
   - Shopping lists
   - Meal prep guides

5. **Social Features**
   - Share progress
   - Friend challenges
   - Community recipes

---

## 🆘 Need Help?

### Common Issues

**"Cannot connect to backend"**
- Ensure backend is running: `cd backend && npm run dev`
- Check `.env` has correct `EXPO_PUBLIC_API_URL`
- For physical devices, use your computer's IP

**"MongoDB connection failed"**
- Install MongoDB locally, or
- Use MongoDB Atlas (free cloud database)
- See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

**"Email not sending"**
- Configure Mailtrap credentials in `backend/.env`
- Or skip for now - app works without it

### Get More Help

Run the setup checker:
```bash
npm run check-setup
```

Check the documentation:
- [QUICKSTART.md](./QUICKSTART.md)
- [SETUP.md](./SETUP.md)
- [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just:

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `npm start`
3. Open the app and register!

**Happy coding!** 🚀

---

<p align="center">
  <sub>Built with ❤️ using advanced authentication by <a href="https://github.com/Megagig">Obi Anthony</a></sub>
</p>
