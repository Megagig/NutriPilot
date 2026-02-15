# 🔐 Environment Variables Setup Guide

This guide will help you configure all the necessary environment variables for NutriPilot.

## 📋 Overview

NutriPilot requires two sets of environment variables:
1. **Backend** (`backend/.env`) - For the Node.js authentication server
2. **Frontend** (`.env`) - For the React Native Expo app

---

## 🔧 Backend Environment Variables

Location: `backend/.env`

### 1. Node Environment

```env
NODE_ENV=development
PORT=5000
```

- `NODE_ENV`: Set to `development` for local testing, `production` for deployment
- `PORT`: The port your backend server will run on (default: 5000)

### 2. MongoDB Connection

**Option A: Local MongoDB**
```env
MONGO_URI=mongodb://localhost:27017/nutripilot_db
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nutripilot_db?retryWrites=true&w=majority
```

**How to get MongoDB Atlas URI:**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `nutripilot_db`

### 3. JWT Secrets

```env
JWT_ACCESS_SECRET=your_strong_random_secret_here
JWT_REFRESH_SECRET=another_strong_random_secret_here
```

**⚠️ IMPORTANT:** Use strong, random secrets in production!

**Generate secure secrets:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

### 4. Email Configuration (SMTP)

**For Development (Mailtrap):**
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"
```

**How to get Mailtrap credentials:**
1. Sign up at https://mailtrap.io (free)
2. Go to "Email Testing" → "Inboxes"
3. Select your inbox
4. Copy the SMTP credentials
5. Paste them into your `.env` file

**For Production (Real Email):**

**Using Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM="NutriPilot <your-email@gmail.com>"
```

**Using SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"
```

### 5. Google OAuth (Optional)

```env
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

**How to get Google OAuth credentials:**
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
7. Copy Client ID and Client Secret

---

## 📱 Frontend Environment Variables

Location: `.env` (root directory)

### API URL Configuration

The frontend needs to know where your backend server is running.

**For iOS Simulator:**
```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

**For Android Emulator:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
```
*Note: Android emulator uses `10.0.2.2` to access the host machine's localhost*

**For Physical Device (Same WiFi Network):**
```env
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:5000
```
*Replace `192.168.1.XXX` with your computer's local IP address*

**How to find your local IP:**

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**For Production:**
```env
EXPO_PUBLIC_API_URL=https://your-api-domain.com
```

---

## ✅ Verification Checklist

### Backend `.env` File
- [ ] `NODE_ENV` is set
- [ ] `PORT` is set (default: 5000)
- [ ] `MONGO_URI` is configured with valid MongoDB connection
- [ ] `JWT_ACCESS_SECRET` is set (strong random string)
- [ ] `JWT_REFRESH_SECRET` is set (different from access secret)
- [ ] `SMTP_HOST` is configured
- [ ] `SMTP_PORT` is configured
- [ ] `SMTP_USER` is configured
- [ ] `SMTP_PASS` is configured
- [ ] `EMAIL_FROM` is set

### Frontend `.env` File
- [ ] `EXPO_PUBLIC_API_URL` is set
- [ ] URL matches your platform (localhost, 10.0.2.2, or local IP)
- [ ] Port matches backend PORT (default: 5000)

---

## 🧪 Testing Your Configuration

### 1. Test Backend Connection

Start the backend:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### 2. Test API Endpoint

```bash
curl http://localhost:5000/health
```

### 3. Test Frontend Connection

Start the app:
```bash
npm start
```

Try to register a new account. If successful, you should:
- See a success message
- Receive an email in Mailtrap (if configured)

---

## 🔒 Security Best Practices

### Development
- ✅ Use Mailtrap for email testing
- ✅ Use local MongoDB or free Atlas cluster
- ✅ Keep `.env` files in `.gitignore`

### Production
- ✅ Use strong, randomly generated JWT secrets
- ✅ Use production SMTP service (SendGrid, AWS SES, etc.)
- ✅ Use MongoDB Atlas with IP whitelist
- ✅ Enable HTTPS for API
- ✅ Use environment variables in hosting platform
- ✅ Never commit `.env` files to version control
- ✅ Rotate secrets regularly

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Check if MongoDB is running
- Verify `MONGO_URI` is correct
- For Atlas: Check IP whitelist and credentials

### "Email not sending"
- Verify SMTP credentials
- Check Mailtrap inbox
- Look at backend console for errors

### "Cannot connect to backend"
- Ensure backend is running
- Check `EXPO_PUBLIC_API_URL` matches backend URL
- For physical devices, ensure same WiFi network
- Check firewall settings

### "Invalid token" errors
- Ensure JWT secrets are set
- Clear app data and login again
- Check token expiration settings

---

## 📚 Additional Resources

- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Mailtrap Documentation](https://mailtrap.io/docs/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)

---

## 🎯 Quick Setup Commands

```bash
# 1. Copy environment files
cp backend/.env.example backend/.env
cp .env.example .env

# 2. Edit the files with your values
# macOS/Linux:
nano backend/.env
nano .env

# Windows:
notepad backend\.env
notepad .env

# 3. Install dependencies
cd backend && npm install && cd ..
npm install

# 4. Start the app
cd backend && npm run dev &
npm start
```

---

Need more help? Check [QUICKSTART.md](./QUICKSTART.md) or [SETUP.md](./SETUP.md)
