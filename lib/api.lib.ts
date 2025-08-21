import { UNPROTECTED_PATHS } from "@/utils/unprotectedpaths.util";
import axios from "axios";

// export const BASE_URL = "https://specified-peacock-mohit123-1b61bd1c.koyeb.app";
export const BASE_URL = "http://localhost:4000";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add response interceptor for refresh token logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle token expiration (refresh token logic)
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;
            try {
                console.log("Refreshing token");
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Refresh token failed");

                // Redirect to login with next param
                if (typeof window !== "undefined") {
                    const currentPath = window.location.pathname + window.location.search;
                    if (!UNPROTECTED_PATHS.includes(window.location.pathname)) {
                        window.location.href = `/auth/login?next=${encodeURIComponent(currentPath)}`;
                    }
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


/* USER ENDPOINTS */
const USER_BASE = "/api/user";
const GET_OWN_PROFILE_ENDPOINT = `${USER_BASE}/me`;
const ADD_USERNAME_ENDPOINT = `${USER_BASE}/username`;
export { GET_OWN_PROFILE_ENDPOINT, ADD_USERNAME_ENDPOINT };

/* Auth ENDPOINTS */
const AUTH_BASE = "/auth";
const SIGNUP_ENDPOINT = `${AUTH_BASE}/signup`;
const LOGIN_ENDPOINT = `${AUTH_BASE}/login`;
const VERIFY_EMAIL_ENDPOINT = `${AUTH_BASE}/verify-email`;
const RESEND_OTP_ENDPOINT = `${AUTH_BASE}/resend-otp`;
const LOGOUT_ENDPOINT = `${AUTH_BASE}/logout`;
/* Forgot-Password */
const FORGOT_PASSWORD = `${AUTH_BASE}/forgot-password`;
const VERIFY_RESET_OTP_ENDPOINT = `${AUTH_BASE}/verify-reset-otp`;
const RESET_PASSWORD_ENDPOINT = `${AUTH_BASE}/reset-password`;
export { SIGNUP_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, VERIFY_EMAIL_ENDPOINT,RESEND_OTP_ENDPOINT, FORGOT_PASSWORD, VERIFY_RESET_OTP_ENDPOINT, RESET_PASSWORD_ENDPOINT };

/* PROBLEM ENDPOINTS */
const PROBLEM_BASE = "/api/problem";
export {PROBLEM_BASE}

/* SUBMISSION ENDPOINTS */
const SUBMISSION_BASE = "/api/submission";
export const ADD_SUBMISSION_ENDPOINT = `${SUBMISSION_BASE}/add`;
export const GET_ALL_PROBLEM_SUBMISSION_ENDPOINT = `${SUBMISSION_BASE}/problem`;

/* DASHBOARD ENDPOINTS */
const DASHBOARD_BASE = "/api/dashboard";
const GET_PROGRESS_SUMMARY = `${DASHBOARD_BASE}/progress-summary`;
const GET_LANGUAGE_STATS = `${DASHBOARD_BASE}/language-stats`;
const GET_SKILL_STATS = `${DASHBOARD_BASE}/skill-stats`;
const GET_RECENT_SUBMISSIONS = `${DASHBOARD_BASE}/recent-submissions`;

export {GET_PROGRESS_SUMMARY, GET_LANGUAGE_STATS, GET_SKILL_STATS, GET_RECENT_SUBMISSIONS};

export default api;
