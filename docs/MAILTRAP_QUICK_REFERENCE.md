# 📧 Mailtrap Production - Quick Reference Card

## 🎯 What You Need

Just **ONE** thing: Your **API Token**

---

## 📍 Where to Get It

```
1. Go to: https://mailtrap.io
2. Click: "Sending Domains" (left sidebar)
3. Select: Your domain
4. Click: "SMTP/API Settings" tab
5. Click: "Generate API Token" button
6. Copy: The token that appears
```

---

## 📝 What to Put in `backend/.env`

```env
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASS=your_api_token_here
EMAIL_FROM="NutriPilot <no-reply@yourdomain.com>"
```

---

## ⚡ Key Points

| Setting | Value | Notes |
|---------|-------|-------|
| `SMTP_HOST` | `live.smtp.mailtrap.io` | Always this for production |
| `SMTP_PORT` | `587` | Recommended port |
| `SMTP_USER` | `api` | Literally the word "api" |
| `SMTP_PASS` | Your API token | NOT your password |
| `EMAIL_FROM` | `"Name <email@domain.com>"` | Use verified domain |

---

## ✅ Quick Checklist

- [ ] Got API token from Mailtrap
- [ ] Updated `backend/.env` with token
- [ ] `SMTP_USER` is `api` (not your email)
- [ ] `SMTP_HOST` is `live.smtp.mailtrap.io` (not sandbox)
- [ ] Saved the file
- [ ] Restarted backend: `cd backend && npm run dev`

---

## 🧪 Test It

```bash
# 1. Restart backend
cd backend
npm run dev

# 2. Register in app with real email
# 3. Check your inbox
```

---

## 🚨 Common Issues

**"Authentication failed"**
- Check `SMTP_USER` is `api`
- Verify token is correct (no spaces)

**"Emails not arriving"**
- Check spam folder
- Verify domain in Mailtrap
- Check Mailtrap email logs

---

## 📚 Full Guides

- [MAILTRAP_CREDENTIALS_GUIDE.md](./MAILTRAP_CREDENTIALS_GUIDE.md) - Detailed walkthrough
- [MAILTRAP_PRODUCTION_SETUP.md](./MAILTRAP_PRODUCTION_SETUP.md) - Complete setup
- [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) - All environment variables

---

<p align="center">
  <strong>That's all you need! 🎉</strong>
</p>
