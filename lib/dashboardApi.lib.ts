import axios from "axios";
import api from "./api.lib";
import { UNPROTECTED_PATHS } from "@/utils/unprotectedpaths.util";

// export const DASHBOARD_URL = "https://koder-dashboard.onrender.com";
export const DASHBOARD_URL = "http://localhost:8000";

export const dashboardAPI = axios.create({
    baseURL: DASHBOARD_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Attach JWT token if present
dashboardAPI.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Add response interceptor for refresh token logic
dashboardAPI.interceptors.response.use(
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
                console.log("Refreshing token");
                const refreshToken = localStorage.getItem("refreshToken");
                const res = await api.post("/auth/refresh", { refreshToken });
                const accessToken = res.data.data;
                localStorage.setItem("accessToken", accessToken);
                return dashboardAPI(originalRequest);
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


/* DASHBOARD ENDPOINTS */
const DASHBOARD_BASE = "/dashboard";
const GET_PROGRESS_SUMMARY = `${DASHBOARD_BASE}/progress-summary`;
const GET_LANGUAGE_STATS = `${DASHBOARD_BASE}/language-stats`;
const GET_SKILL_STATS = `${DASHBOARD_BASE}/skill-stats`;
const GET_RECENT_SUBMISSIONS = `${DASHBOARD_BASE}/recent-submissions`;

export { GET_PROGRESS_SUMMARY, GET_LANGUAGE_STATS, GET_SKILL_STATS, GET_RECENT_SUBMISSIONS };

export default dashboardAPI;