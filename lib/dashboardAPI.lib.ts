import axios from "axios";
import api from "./api.lib";

export const DASHBOARD_URL = "https://koder-dashboard.onrender.com";
//export const DASHBOARD_URL = "http://localhost:5000";

export const api2 = axios.create({
    baseURL: DASHBOARD_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add response interceptor for refresh token logic
api2.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Prevent infinite loop
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh") // <-- Prevent infinite loop
        ) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                console.log("Refreshing token");
                await api.post("/auth/refresh");
                // Retry original request
                return api2(originalRequest);
            } catch (refreshError) {
                // Redirect to login if refresh fails
                console.log("Refresh token failed");
                if (typeof window !== "undefined") {
                    const publicPaths = ["/", "/auth/login", "/auth/signup"];
                    if (!publicPaths.includes(window.location.pathname)) {
                        window.location.href = "/auth/login";
                    }
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


/* DASHBOARD ENDPOINTS */
const DASHBOARD_BASE = "/dashboard";
const GET_PROGRESS_SUMMARY = `${DASHBOARD_BASE}/progress-summary`;
const GET_LANGUAGE_STATS = `${DASHBOARD_BASE}/language-stats`;
const GET_SKILL_STATS = `${DASHBOARD_BASE}/skill-stats`;
const GET_RECENT_SUBMISSIONS = `${DASHBOARD_BASE}/recent-submissions`;

export {GET_PROGRESS_SUMMARY, GET_LANGUAGE_STATS, GET_SKILL_STATS, GET_RECENT_SUBMISSIONS};

export default api2;