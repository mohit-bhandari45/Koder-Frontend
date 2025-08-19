// utils/unprotectedpaths.util.ts
export const UNPROTECTED_PATHS = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/code-editor",
];


/**
# UNPROTECTED_PATHS Utility
This file defines all **unprotected frontend routes** in the app.  
These routes do **not** require authentication or verification to access.

---

## Why is this needed?

We use `UNPROTECTED_PATHS` in **three different layers**:
1. **Next.js Middleware**  
   - Decides whether a user can access a page before it loads.  
   - If a path is **not** in `UNPROTECTED_PATHS` → authentication is required.

2. **Axios Interceptor**  
   - Runs when an API request fails with `401 Unauthorized`.  
   - If the current path is unprotected → don’t force redirect to login.  
   - If protected → redirect user to `/auth/login?next=...`.

3. **UserContext**  
   - Runs after fetching the current user (`/me`).  
   - Redirects logged-in users away from unprotected paths like `/auth/login`, `/auth/signup`.  
   - Ensures verified email & username before giving full access.

---

## Layers Breakdown

- **Middleware = Gatekeeper**  
  Controls page access on the server side.

- **Axios Interceptor = Token Doctor**  
  Refreshes expired access tokens. If refresh fails → sends user back to login (except for unprotected routes).

- **UserContext = Traffic Controller**  
  Applies app-specific rules (email verified, username chosen, redirect logged-in users).

---

**/