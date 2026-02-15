# 📧 Mailtrap Production SMTP Setup Guide

## 🎯 Overview

You're switching from Mailtrap Sandbox (testing) to Mailtrap Production API/SMTP (real email sending).

---

## 📋 Step-by-Step Setup

### Step 1: Access Mailtrap Production

1. Log into https://mailtrap.io
2. Click on **"Sending Domains"** in the left sidebar (NOT "Email Testing")
3. This is where you'll set up real email sending

### Step 2: Add Your Domain (Recommended)

**Option A: Use Your Own Domain (Recommended for Production)**

1. Click **"Add Domain"**
2. Enter your domain (e.g., `nutripilot.com`)
3. Verify domain ownership by adding DNS records:
   - **TXT record** for domain verification
   - **CNAME records** for DKIM
   - **MX record** (optional, for receiving)
4. Wait for DNS propagation (can take up to 48 hours)
5. Once verified, you can send from `no-reply@yourdomain.com`

**Option B: Use Mailtrap Shared Domain (Quick Testing)**

1. Mailtrap provides a shared sending domain for testing
2. You can send emails immediately
3. Emails will come from `@mailtrap.io` domain
4. Good for testing, but use your own domain for production

### Step 3: Get Your SMTP Credentials

1. In **"Sending Domains"**, click on your domain
2. Go to **"SMTP/API Settings"** tab
3. You'll see your credentials:

```
Host: live.smtp.mailtrap.io
Port: 587 (or 2525, 25)
Username: api
Password: [Your API Token]
```

### Step 4: Generate API Token

1. In the SMTP settings, click **"Generate API Token"**
2. Give it a name (e.g., "NutriPilot Production")
3. Copy the token - **you won't see it again!**
4. This token is your `SMTP_PASS`

### Step 5: Update Your `backend/.env`

```env
# Email Configuration (Mailtrap Production)
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=your_api_token_here
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"
```

**Important Notes:**
- `SMTP_USER` is always `api` (not your email)
- `SMTP_PASS` is your API token (not your password)
- `EMAIL_FROM` should match your verified domain

---

## 🔧 Configuration Details

### SMTP Settings

**Host:**
```env
SMTP_HOST=live.smtp.mailtrap.io
```

**Port Options:**
```env
SMTP_PORT=587   # Recommended (TLS/STARTTLS)
# or
SMTP_PORT=2525  # Alternative
# or
SMTP_PORT=25    # Standard SMTP
```

**Authentication:**
```env
SMTP_USER=api
SMTP_PASS=your_mailtrap_api_token
```

**From Address:**
```env
# If using your own verified domain:
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"

# If using Mailtrap shared domain:
EMAIL_FROM="NutriPilot <noreply@mailtrap.io>"
```

---

## ✅ Complete Example

Here's what your `backend/.env` should look like:

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/nutripilot_db

# JWT Secrets
JWT_ACCESS_SECRET=nutripilot_access_secret_change_in_production
JWT_REFRESH_SECRET=nutripilot_refresh_secret_change_in_production

# Mailtrap Production SMTP
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=1a2b3c4d5e6f7g8h9i0j
EMAIL_FROM="NutriPilot <no-reply@nutripilot.com>"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

---

## 🧪 Testing Your Setup

### Step 1: Restart Backend

```bash
cd backend
npm run dev
```

### Step 2: Register a New Account

1. Open your app
2. Register with a **real email address**
3. Check your actual email inbox

### Step 3: Verify Email Delivery

You should receive:
- Welcome/verification email
- Password reset emails (if you test that flow)

### Step 4: Monitor in Mailtrap

1. Go to Mailtrap dashboard
2. Click on **"Sending Domains"**
3. View **"Email Logs"** to see sent emails
4. Check delivery status, opens, clicks, etc.

---

## 📊 Mailtrap Production Features

### Email Analytics
- Delivery status
- Open rates
- Click tracking
- Bounce handling
- Spam complaints

### Email Logs
- View all sent emails
- Check delivery status
- Debug issues
- Resend failed emails

### Sending Limits
- **Free Plan**: 1,000 emails/month
- **Paid Plans**: Higher limits available
- Check your current usage in dashboard

---

## 🔒 Security Best Practices

### 1. Protect Your API Token
```bash
# Never commit .env files
# Already in .gitignore:
.env
```

### 2. Use Environment Variables
```javascript
// In production, use environment variables
process.env.SMTP_PASS
```

### 3. Rotate Tokens Regularly
- Generate new API tokens periodically
- Revoke old tokens in Mailtrap dashboard

### 4. Monitor Usage
- Check Mailtrap dashboard for suspicious activity
- Set up alerts for high usage

---

## 🚨 Troubleshooting

### "Authentication failed"
- ✅ Check `SMTP_USER` is `api` (not your email)
- ✅ Verify API token is correct
- ✅ Ensure no extra spaces in `.env` file

### "Domain not verified"
- ✅ Check DNS records are added correctly
- ✅ Wait for DNS propagation (up to 48 hours)
- ✅ Use Mailtrap's DNS checker tool

### "Emails not arriving"
- ✅ Check spam folder
- ✅ Verify `EMAIL_FROM` matches verified domain
- ✅ Check Mailtrap email logs for delivery status
- ✅ Ensure recipient email is valid

### "Rate limit exceeded"
- ✅ Check your sending limits in Mailtrap
- ✅ Upgrade plan if needed
- ✅ Implement rate limiting in your app

---

## 📈 Production Checklist

Before going live:

- [ ] Domain verified in Mailtrap
- [ ] DNS records configured correctly
- [ ] API token generated and stored securely
- [ ] `EMAIL_FROM` uses verified domain
- [ ] Test emails sent successfully
- [ ] Email templates look good
- [ ] Unsubscribe links work (if applicable)
- [ ] Bounce handling configured
- [ ] Monitoring and alerts set up

---

## 🔄 Switching Between Sandbox and Production

### Development (Sandbox)
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_sandbox_username
SMTP_PASS=your_sandbox_password
```

### Production (Live SMTP)
```env
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=your_api_token
```

**Pro Tip:** Use different `.env` files for different environments:
- `.env.development` - Sandbox
- `.env.production` - Live SMTP

---

## 📚 Additional Resources

- [Mailtrap Sending Domains Docs](https://help.mailtrap.io/article/69-sending-domains)
- [Mailtrap SMTP Settings](https://help.mailtrap.io/article/109-getting-started-with-mailtrap-email-sending)
- [Domain Verification Guide](https://help.mailtrap.io/article/70-domain-verification)
- [API Documentation](https://api-docs.mailtrap.io/)

---

## 💡 Quick Reference

**What you need from Mailtrap:**
1. ✅ API Token (from Sending Domains → SMTP Settings)
2. ✅ Verified domain (optional but recommended)

**What goes in `backend/.env`:**
```env
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=[your_api_token]
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"
```

**Test it:**
```bash
cd backend
npm run dev
# Register a new account in the app
# Check your real email inbox
```

---

<p align="center">
  <strong>🎉 You're ready to send real emails! 🎉</strong>
</p>

<p align="center">
  <sub>Remember to verify your domain for best deliverability</sub>
</p>
