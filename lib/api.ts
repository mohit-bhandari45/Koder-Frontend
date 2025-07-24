import axios from "axios";

// const BASE_URL = "https://fixed-hermina-mohit123-bf1cd383.koyeb.app";
const BASE_URL = "http://localhost:4000";

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
                return api(originalRequest);
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


/* USER ENDPOINTS */
const USER_BASE = "/api/user";
const GET_OWN_PROFILE_ENDPOINT = `${USER_BASE}/me`;
const ADD_USERNAME_ENDPOINT = `${USER_BASE}/username`;
export { GET_OWN_PROFILE_ENDPOINT, ADD_USERNAME_ENDPOINT };

/* PROBLEM ENDPOINTS */
const PROBLEM_BASE = "/api/problem";
export {PROBLEM_BASE}

/* SUBMISSION ENDPOINTS */
const SUBMISSION_BASE = "/api/submission";
export const ADD_SUBMISSION_ENDPOINT = `${SUBMISSION_BASE}/add`;

export default api;
