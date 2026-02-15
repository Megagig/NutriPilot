# 🚀 Start Backend Server

## ✅ Server Now Configured for Network Access

The backend server is now configured to listen on **all network interfaces (0.0.0.0)**, which means:
- ✅ Accessible from localhost (127.0.0.1)
- ✅ Accessible from your network IP (10.179.137.36)
- ✅ Your phone/device can connect to it

---

## 🎯 Start the Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
Server running on http://0.0.0.0:5000
Local: http://localhost:5000
Network: http://10.179.137.36:5000
```

---

## 🔍 Verify Server is Accessible

### Test 1: From Your Computer (localhost)
```bash
curl http://localhost:5000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

### Test 2: From Your Computer (network IP)
```bash
curl http://10.179.137.36:5000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nutripilot.com","password":"Admin@123456"}'
```

### Test 3: From Frontend
```bash
cd frontend
npm run test:connection
```

**All three should return a successful login response!** ✅

---

## 📱 Now Test in Your App

1. **Make sure backend is running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Restart your Expo dev server:**
   ```bash
   cd frontend
   npm start
   ```

3. **Reload your app:**
   - Shake device or press `r` in terminal
   - Or close and reopen the app

4. **Try logging in:**
   - Email: `admin@nutripilot.com`
   - Password: `Admin@123456`
   - Should work! 🎉

---

## 🔧 What Changed?

**Before:**
```typescript
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```
- Only listened on localhost (127.0.0.1)
- Not accessible from network

**After:**
```typescript
const host = '0.0.0.0';
server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
  console.log(`Network: http://10.179.137.36:${port}`);
});
```
- Listens on all network interfaces (0.0.0.0)
- Accessible from localhost AND network IP
- Your phone can now connect!

---

## 🔒 Security Note

**For Development:**
- ✅ Listening on 0.0.0.0 is fine
- ✅ Only accessible on your local network
- ✅ Firewall protects from external access

**For Production:**
- Use proper firewall rules
- Use HTTPS/SSL
- Use environment-specific configuration
- Consider using a reverse proxy (nginx)

---

## 🆘 Troubleshooting

### "Address already in use"
```bash
# Kill any process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
# Update backend/.env: PORT=5001
```

### "Cannot connect from phone"
```bash
# Check firewall
sudo ufw status

# Allow port 5000
sudo ufw allow 5000/tcp

# Or temporarily disable firewall (not recommended)
sudo ufw disable
```

### "Connection refused"
```bash
# Make sure backend is running
cd backend
npm run dev

# Check if listening on 0.0.0.0
netstat -tuln | grep 5000
# Should show: 0.0.0.0:5000
```

---

## ✅ Quick Checklist

- [ ] Backend running: `npm run dev`
- [ ] Server shows: `http://0.0.0.0:5000`
- [ ] Can curl localhost: ✅
- [ ] Can curl network IP: ✅
- [ ] Frontend .env has: `http://10.179.137.36:5000`
- [ ] Expo dev server restarted
- [ ] App reloaded

---

<p align="center">
  <strong>Your backend is now accessible from your phone! 🎉</strong>
</p>
