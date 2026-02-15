# 🔐 Authentication Flow Documentation

This document explains how authentication works in NutriPilot.

---

## 📊 Authentication Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     NutriPilot App                          │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Sign In    │         │   Sign Up    │                │
│  │   Screen     │         │   Screen     │                │
│  └──────┬───────┘         └──────┬───────┘                │
│         │                        │                         │
│         └────────┬───────────────┘                         │
│                  │                                         │
│         ┌────────▼────────┐                                │
│         │  authService.ts │                                │
│         └────────┬────────┘                                │
│                  │                                         │
│         ┌────────▼────────┐                                │
│         │     api.ts      │                                │
│         │  (Axios + JWT)  │                                │
│         └────────┬────────┘                                │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   │ HTTP Requests
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              Backend Server (Port 5000)                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Auth Routes                             │  │
│  │  POST /auth/register                                 │  │
│  │  POST /auth/login                                    │  │
│  │  POST /auth/logout                                   │  │
│  │  POST /auth/refresh                                  │  │
│  │  POST /auth/forgot-password                          │  │
│  │  POST /auth/reset-password                           │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│  ┌──────────────────▼───────────────────────────────────┐  │
│  │           Auth Controller                            │  │
│  │  - Validate input (Zod)                              │  │
│  │  - Hash passwords (bcrypt)                           │  │
│  │  - Generate JWT tokens                               │  │
│  │  - Send emails (Nodemailer)                          │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│  ┌──────────────────▼───────────────────────────────────┐  │
│  │              MongoDB                                 │  │
│  │  - User collection                                   │  │
│  │  - Store hashed passwords                            │  │
│  │  - Store user data                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Registration Flow

```
User                    Frontend                Backend                 Database
 │                         │                       │                       │
 │  1. Fill form          │                       │                       │
 │  (name, email, pwd)    │                       │                       │
 │────────────────────────>│                       │                       │
 │                         │                       │                       │
 │                         │  2. POST /auth/register                      │
 │                         │  { email, password, name }                   │
 │                         │──────────────────────>│                       │
 │                         │                       │                       │
 │                         │                       │  3. Validate input    │
 │                         │                       │     (Zod schema)      │
 │                         │                       │                       │
 │                         │                       │  4. Hash password     │
 │                         │                       │     (bcrypt)          │
 │                         │                       │                       │
 │                         │                       │  5. Create user       │
 │                         │                       │─────────────────────>│
 │                         │                       │                       │
 │                         │                       │  6. User saved        │
 │                         │                       │<─────────────────────│
 │                         │                       │                       │
 │                         │                       │  7. Generate tokens   │
 │                         │                       │     - Access token    │
 │                         │                       │     - Refresh token   │
 │                         │                       │                       │
 │                         │                       │  8. Send verification │
 │                         │                       │     email (Mailtrap)  │
 │                         │                       │                       │
 │                         │  9. Return tokens     │                       │
 │                         │<──────────────────────│                       │
 │                         │                       │                       │
 │                         │  10. Store tokens     │                       │
 │                         │      (AsyncStorage)   │                       │
 │                         │                       │                       │
 │  11. Navigate to home  │                       │                       │
 │<────────────────────────│                       │                       │
```

---

## 🔑 Login Flow

```
User                    Frontend                Backend                 Database
 │                         │                       │                       │
 │  1. Enter credentials  │                       │                       │
 │  (email, password)     │                       │                       │
 │────────────────────────>│                       │                       │
 │                         │                       │                       │
 │                         │  2. POST /auth/login  │                       │
 │                         │  { email, password }  │                       │
 │                         │──────────────────────>│                       │
 │                         │                       │                       │
 │                         │                       │  3. Find user         │
 │                         │                       │─────────────────────>│
 │                         │                       │                       │
 │                         │                       │  4. User data         │
 │                         │                       │<─────────────────────│
 │                         │                       │                       │
 │                         │                       │  5. Compare password  │
 │                         │                       │     (bcrypt.compare)  │
 │                         │                       │                       │
 │                         │                       │  6. Generate tokens   │
 │                         │                       │     - Access token    │
 │                         │                       │     - Refresh token   │
 │                         │                       │                       │
 │                         │  7. Return tokens     │                       │
 │                         │     & user data       │                       │
 │                         │<──────────────────────│                       │
 │                         │                       │                       │
 │                         │  8. Store tokens      │                       │
 │                         │     (AsyncStorage)    │                       │
 │                         │                       │                       │
 │  9. Navigate to home   │                       │                       │
 │<────────────────────────│                       │                       │
```

---

## 🔄 Token Refresh Flow

```
Frontend                Backend                 
   │                       │                       
   │  1. API request       │                       
   │  (with expired token) │                       
   │──────────────────────>│                       
   │                       │                       
   │  2. 401 Unauthorized  │                       
   │<──────────────────────│                       
   │                       │                       
   │  3. Interceptor       │                       
   │     detects 401       │                       
   │                       │                       
   │  4. POST /auth/refresh│                       
   │  { refreshToken }     │                       
   │──────────────────────>│                       
   │                       │                       
   │                       │  5. Validate refresh  │
   │                       │     token             │
   │                       │                       │
   │                       │  6. Generate new      │
   │                       │     access token      │
   │                       │                       │
   │  7. New access token  │                       │
   │<──────────────────────│                       │
   │                       │                       │
   │  8. Store new token   │                       │
   │     (AsyncStorage)    │                       │
   │                       │                       │
   │  9. Retry original    │                       │
   │     request           │                       │
   │──────────────────────>│                       │
   │                       │                       │
   │  10. Success response │                       │
   │<──────────────────────│                       │
```

---

## 🔓 Logout Flow

```
User                    Frontend                Backend                 
 │                         │                       │                       
 │  1. Click logout       │                       │                       
 │────────────────────────>│                       │                       
 │                         │                       │                       
 │                         │  2. POST /auth/logout │                       
 │                         │──────────────────────>│                       
 │                         │                       │                       
 │                         │                       │  3. Invalidate tokens │
 │                         │                       │     (increment version)
 │                         │                       │                       
 │                         │  4. Success response  │                       
 │                         │<──────────────────────│                       
 │                         │                       │                       
 │                         │  5. Clear tokens      │                       
 │                         │     (AsyncStorage)    │                       
 │                         │                       │                       
 │  6. Navigate to login  │                       │                       
 │<────────────────────────│                       │                       
```

---

## 🔑 Password Reset Flow

```
User                    Frontend                Backend                 Email
 │                         │                       │                       │
 │  1. Click "Forgot      │                       │                       │
 │     Password"          │                       │                       │
 │────────────────────────>│                       │                       │
 │                         │                       │                       │
 │  2. Enter email        │                       │                       │
 │────────────────────────>│                       │                       │
 │                         │                       │                       │
 │                         │  3. POST /auth/       │                       │
 │                         │     forgot-password   │                       │
 │                         │──────────────────────>│                       │
 │                         │                       │                       │
 │                         │                       │  4. Generate reset    │
 │                         │                       │     token (JWT)       │
 │                         │                       │                       │
 │                         │                       │  5. Send reset email  │
 │                         │                       │──────────────────────>│
 │                         │                       │                       │
 │                         │  6. Success message   │                       │
 │                         │<──────────────────────│                       │
 │                         │                       │                       │
 │  7. Check email        │                       │                       │
 │────────────────────────────────────────────────────────────────────────>│
 │                         │                       │                       │
 │  8. Click reset link   │                       │                       │
 │<────────────────────────────────────────────────────────────────────────│
 │                         │                       │                       │
 │  9. Enter new password │                       │                       │
 │────────────────────────>│                       │                       │
 │                         │                       │                       │
 │                         │  10. POST /auth/      │                       │
 │                         │      reset-password   │                       │
 │                         │──────────────────────>│                       │
 │                         │                       │                       │
 │                         │                       │  11. Verify token     │
 │                         │                       │                       │
 │                         │                       │  12. Hash new password│
 │                         │                       │                       │
 │                         │                       │  13. Update user      │
 │                         │                       │                       │
 │                         │  14. Success          │                       │
 │                         │<──────────────────────│                       │
 │                         │                       │                       │
 │  15. Navigate to login │                       │                       │
 │<────────────────────────│                       │                       │
```

---

## 🔐 Token Structure

### Access Token (Short-lived: 15 minutes)
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "user",
  "tokenVersion": 1,
  "iat": 1234567890,
  "exp": 1234568790
}
```

### Refresh Token (Long-lived: 7 days)
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "tokenVersion": 1,
  "iat": 1234567890,
  "exp": 1235172690
}
```

---

## 📦 Token Storage

### Frontend (AsyncStorage)
```javascript
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "isEmailVerified": true
  }
}
```

---

## 🛡️ Security Features

### 1. Password Security
- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ Never stored in plain text
- ✅ Minimum 8 characters required
- ✅ Password validation on frontend and backend

### 2. Token Security
- ✅ Access tokens expire in 15 minutes
- ✅ Refresh tokens expire in 7 days
- ✅ Tokens stored in HttpOnly cookies (backend)
- ✅ Tokens stored in AsyncStorage (mobile)
- ✅ Token versioning for invalidation

### 3. Request Security
- ✅ JWT verification on protected routes
- ✅ Automatic token refresh
- ✅ CORS configuration
- ✅ Input validation with Zod
- ✅ Error handling

### 4. Email Security
- ✅ Email verification required
- ✅ Secure password reset tokens
- ✅ Token expiration (1 hour)
- ✅ One-time use tokens

---

## 🔧 API Endpoints

### Public Endpoints (No Auth Required)
```
POST   /auth/register          - Register new user
POST   /auth/login             - Login user
POST   /auth/forgot-password   - Request password reset
POST   /auth/reset-password    - Reset password with token
GET    /auth/verify-email      - Verify email with token
```

### Protected Endpoints (Auth Required)
```
POST   /auth/logout            - Logout user
POST   /auth/refresh           - Refresh access token
GET    /user/me                - Get current user
```

### Admin Endpoints (Admin Role Required)
```
GET    /admin/users            - List all users
```

---

## 📱 Frontend Implementation

### authService.ts
```typescript
class AuthService {
  async register(data: RegisterData): Promise<AuthResponse>
  async login(data: LoginData): Promise<AuthResponse>
  async logout(): Promise<void>
  async forgotPassword(email: string): Promise<void>
  async resetPassword(token: string, password: string): Promise<void>
  async getCurrentUser()
  async getStoredUser()
  async isAuthenticated(): Promise<boolean>
}
```

### api.ts (Axios Interceptors)
```typescript
// Request Interceptor
- Add Authorization header with access token

// Response Interceptor
- Detect 401 errors
- Automatically refresh token
- Retry failed request
- Handle refresh failures
```

---

## 🎯 Authentication States

```
┌─────────────────────────────────────────────────────────┐
│                   App Launch                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │ Check Storage  │
            │ for tokens     │
            └────────┬───────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────┐            ┌─────────┐
    │ No Token│            │Has Token│
    └────┬────┘            └────┬────┘
         │                      │
         ▼                      ▼
    ┌─────────┐          ┌──────────┐
    │  Auth   │          │Validate  │
    │ Screens │          │  Token   │
    └─────────┘          └────┬─────┘
         │                    │
         │         ┌──────────┴──────────┐
         │         │                     │
         │         ▼                     ▼
         │    ┌─────────┐          ┌─────────┐
         │    │  Valid  │          │ Invalid │
         │    └────┬────┘          └────┬────┘
         │         │                    │
         │         ▼                    │
         │    ┌─────────┐               │
         │    │  Main   │               │
         │    │   App   │               │
         │    └─────────┘               │
         │                              │
         └──────────────────────────────┘
```

---

## 🔄 State Management

### User States
- `null` - Not authenticated
- `loading` - Checking authentication
- `authenticated` - User logged in
- `unauthenticated` - User logged out

### Navigation Logic
```typescript
if (!isAuth && !inAuthGroup) {
  // Not logged in, not in auth screens
  router.replace('/(auth)/signin');
} else if (isAuth && inAuthGroup) {
  // Logged in, but in auth screens
  router.replace('/(tabs)');
}
```

---

## 📊 Error Handling

### Frontend Errors
- Network errors → Show alert
- Validation errors → Show field errors
- Auth errors → Redirect to login
- Server errors → Show error message

### Backend Errors
- 400 Bad Request → Validation failed
- 401 Unauthorized → Invalid/expired token
- 403 Forbidden → Insufficient permissions
- 404 Not Found → Resource not found
- 500 Server Error → Internal error

---

## 🧪 Testing Authentication

### Manual Testing Steps
1. Register new account
2. Check email (Mailtrap)
3. Login with credentials
4. Access protected routes
5. Test token refresh (wait 15 min)
6. Test logout
7. Test forgot password
8. Test invalid credentials

### Test Accounts
Create test accounts with different roles:
- Regular user
- Admin user (if implementing RBAC)

---

## 📚 Related Files

- `services/authService.ts` - Authentication service
- `services/api.ts` - Axios configuration
- `app/(auth)/signin.tsx` - Sign in screen
- `app/(auth)/signup.tsx` - Sign up screen
- `app/(auth)/forgot-password.tsx` - Password reset
- `app/_layout.tsx` - Auth routing logic
- `backend/src/controllers/auth/` - Auth controller
- `backend/src/routes/auth.routes.ts` - Auth routes
- `backend/src/middlewares/requireAuth.ts` - Auth middleware

---

<p align="center">
  <sub>For more information, see the main documentation files</sub>
</p>
