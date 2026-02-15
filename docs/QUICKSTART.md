# 🚀 NutriPilot Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Environment Variables

The `.env` file has been created in the `backend` folder with default values.

### Required Configuration:

1. **MongoDB** - Choose one option:

   **Option A: Local MongoDB**
   ```bash
   # Install MongoDB locally
   # macOS: brew install mongodb-community
   # Ubuntu: sudo apt-get install mongodb
   # Windows: Download from mongodb.com
   
   # Start MongoDB
   mongod
   ```
   
   **Option B: MongoDB Atlas (Cloud)**
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Update `MONGO_URI` in `backend/.env`

2. **Email (Mailtrap for testing)**
   - Sign up at https://mailtrap.io (free)
   - Go to your inbox settings
   - Copy SMTP credentials
   - Update these in `backend/.env`:
     - `SMTP_USER`
     - `SMTP_PASS`

## Step 3: Start the Backend

```bash
# From the backend directory
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## Step 4: Configure Frontend

The `.env` file has been created in the root directory.

### For Different Platforms:

**iOS Simulator:**
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**Android Emulator:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```

**Physical Device:**
```env
# Replace with your computer's IP address
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```

To find your IP:
- macOS/Linux: `ifconfig | grep inet`
- Windows: `ipconfig`

## Step 5: Start the App

```bash
# From the root directory
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Step 6: Test the App

1. **Register a new account**
   - Open the app
   - Tap "Sign Up"
   - Fill in your details
   - Submit

2. **Check your email**
   - Go to https://mailtrap.io
   - Check your inbox for verification email
   - (In production, this would be a real email)

3. **Login**
   - Go back to the app
   - Tap "Sign In"
   - Enter your credentials
   - You're in!

## 🎉 You're All Set!

The app is now running with:
- ✅ Secure authentication
- ✅ Email verification
- ✅ Password reset
- ✅ JWT token management
- ✅ Beautiful UI/UX

## 🔧 Troubleshooting

### "Cannot connect to server"
- Ensure backend is running on port 5000
- Check your `EXPO_PUBLIC_API_URL` in `.env`
- For physical devices, use your computer's IP address

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGO_URI` in `backend/.env`
- For Atlas, ensure your IP is whitelisted

### "Email not sending"
- Verify Mailtrap credentials in `backend/.env`
- Check backend console for errors

## 📱 Next Steps

Now that authentication is working, you can:
1. Explore the app screens
2. Test the forgot password flow
3. Check out the profile page
4. Start building the calorie tracking features!

## 📚 More Information

- [Full Setup Guide](./SETUP.md)
- [Backend Documentation](./backend/README.md)
- [Main README](./README.md)

## 🆘 Need Help?

- Check the backend console for errors
- Look at the Expo console for frontend issues
- Review the [SETUP.md](./SETUP.md) for detailed instructions

---

Happy coding! 🚀
