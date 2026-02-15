# 🔑 Where to Find Your Mailtrap Production Credentials

## 📍 Quick Navigation

1. Go to https://mailtrap.io
2. Log in to your account
3. Follow the steps below based on what you need

---

## 🎯 Getting Your SMTP Credentials (Step-by-Step)

### Step 1: Access Sending Domains

```
Dashboard → Left Sidebar → "Sending Domains"
```

**NOT** "Email Testing" (that's the sandbox)

### Step 2: Add or Select Domain

**If you don't have a domain yet:**
```
Click "Add Domain" button
→ Enter your domain name (e.g., nutripilot.com)
→ Or use Mailtrap's shared domain for testing
```

**If you already have a domain:**
```
Click on your domain name in the list
```

### Step 3: Get SMTP Settings

```
Your Domain → "SMTP/API Settings" tab
```

You'll see a screen like this:

```
┌─────────────────────────────────────────────────┐
│         SMTP/API Settings                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Host:     live.smtp.mailtrap.io               │
│  Port:     587                                  │
│  Username: api                                  │
│  Password: [Generate API Token]                │
│                                                 │
│  [Generate API Token] button                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Step 4: Generate API Token

```
Click "Generate API Token" button
→ Enter a name: "NutriPilot Production"
→ Click "Create"
→ COPY THE TOKEN IMMEDIATELY (you won't see it again!)
```

The token looks like this:
```
1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

---

## 📝 What Each Credential Means

### SMTP_HOST
```env
SMTP_HOST=live.smtp.mailtrap.io
```
- This is **always** `live.smtp.mailtrap.io` for production
- Don't change this

### SMTP_PORT
```env
SMTP_PORT=587
```
- Use `587` (recommended)
- Or `2525` or `25` (alternatives)

### SMTP_USER
```env
SMTP_USER=api
```
- This is **always** `api` (literally the word "api")
- NOT your email address
- NOT your Mailtrap username

### SMTP_PASS
```env
SMTP_PASS=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```
- This is your **API Token** (generated in Step 4)
- NOT your Mailtrap account password
- Copy it exactly as shown

### EMAIL_FROM
```env
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"
```
- Use your verified domain
- Or use `@mailtrap.io` for testing
- Format: `"App Name <email@domain.com>"`

---

## 🎨 Visual Guide

```
Mailtrap Dashboard
│
├── Email Testing (Sandbox) ❌ NOT THIS
│   └── For development/testing only
│
└── Sending Domains ✅ USE THIS
    │
    ├── Add Domain
    │   ├── Enter domain name
    │   ├── Verify DNS records
    │   └── Wait for verification
    │
    └── Your Domain
        │
        ├── Overview
        ├── DNS Settings
        └── SMTP/API Settings ✅ GO HERE
            │
            ├── Host: live.smtp.mailtrap.io
            ├── Port: 587
            ├── Username: api
            └── Password: [Generate API Token] ← CLICK THIS
                │
                └── Copy token → Put in SMTP_PASS
```

---

## 📋 Copy-Paste Template

Once you have your API token, update `backend/.env`:

```env
# Mailtrap Production SMTP
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=paste_your_api_token_here
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"
```

**Example with fake token:**
```env
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"
```

---

## ✅ Verification Checklist

Before testing, verify:

- [ ] `SMTP_HOST` is `live.smtp.mailtrap.io` (not sandbox)
- [ ] `SMTP_PORT` is `587`
- [ ] `SMTP_USER` is `api` (not your email)
- [ ] `SMTP_PASS` is your API token (not your password)
- [ ] `EMAIL_FROM` has a valid email format
- [ ] No extra spaces or quotes in values
- [ ] File is saved

---

## 🧪 Test Your Configuration

### Quick Test

1. **Restart your backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Register a new account in the app**
   - Use a **real email address**
   - Check your actual inbox

3. **Check Mailtrap logs:**
   ```
   Sending Domains → Your Domain → Email Logs
   ```

### What You Should See

**In your email inbox:**
- Welcome/verification email from NutriPilot

**In Mailtrap dashboard:**
- Email appears in "Email Logs"
- Status shows "Delivered"
- No errors

---

## 🚨 Common Mistakes

### ❌ Wrong: Using Sandbox Credentials
```env
SMTP_HOST=sandbox.smtp.mailtrap.io  # Wrong!
SMTP_USER=your_username              # Wrong!
```

### ✅ Correct: Using Production Credentials
```env
SMTP_HOST=live.smtp.mailtrap.io     # Correct!
SMTP_USER=api                        # Correct!
```

### ❌ Wrong: Using Account Password
```env
SMTP_PASS=your_mailtrap_password    # Wrong!
```

### ✅ Correct: Using API Token
```env
SMTP_PASS=1a2b3c4d5e6f7g8h9i0j      # Correct!
```

### ❌ Wrong: Email Format
```env
EMAIL_FROM=no-reply@yourdomain.com  # Missing name
```

### ✅ Correct: Email Format
```env
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"  # Correct!
```

---

## 🔐 Security Reminder

**Your API token is sensitive!**

- ✅ Keep it in `.env` file (already in `.gitignore`)
- ✅ Never commit it to Git
- ✅ Don't share it publicly
- ✅ Rotate it periodically
- ❌ Don't hardcode it in your code

---

## 📞 Need Help?

### Can't find Sending Domains?
- Make sure you're logged into Mailtrap.io
- Look in the left sidebar
- It's separate from "Email Testing"

### Can't generate API token?
- Make sure you have a domain added
- Check if you have permission (account owner)
- Try refreshing the page

### Token not working?
- Copy the entire token (no spaces)
- Make sure `SMTP_USER` is `api`
- Check for typos in `.env` file
- Restart your backend server

---

## 📚 Related Documentation

- [MAILTRAP_PRODUCTION_SETUP.md](./MAILTRAP_PRODUCTION_SETUP.md) - Complete setup guide
- [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) - All environment variables
- [backend/.env](./backend/.env) - Your configuration file

---

## 🎯 Quick Summary

**What you need:**
1. API Token from Mailtrap

**Where to get it:**
1. Mailtrap.io → Sending Domains → SMTP/API Settings → Generate API Token

**Where to put it:**
1. `backend/.env` → `SMTP_PASS=your_token_here`

**How to test:**
1. Restart backend
2. Register in app
3. Check real email

---

<p align="center">
  <strong>That's it! You're ready to send real emails! 📧</strong>
</p>
