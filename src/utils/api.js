import axios from 'axios';
import { setDataInLocalStorage, getDataFromLocalStorage } from './common';
import { LOCAL_STORAGE } from './constants';

const BASE_URL = import.meta.env.VITE_APP_BASE_BACKEND_URL;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add access token to requests
apiClient.interceptors.request.use(
    (config) => {
        config.headers['x-api-key'] = import.meta.env.VITE_X_API_KEY;
        const accessToken = getDataFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, null);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getDataFromLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, null);

            if (!refreshToken) {
                // No refresh token, redirect to login
                handleLogout();
                return Promise.reject(error);
            }

            try {
                // Call refresh token endpoint
                const response = await axios.post(`${BASE_URL}/access/refresh-token`, {
                    refreshToken
                });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                // Save new tokens
                setDataInLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
                if (newRefreshToken) {
                    setDataInLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, newRefreshToken);
                }

                // Update authorization header
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Process queued requests
                processQueue(null, newAccessToken);

                isRefreshing = false;

                // Retry original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh token is invalid or expired
                processQueue(refreshError, null);
                isRefreshing = false;
                handleLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.APP_USER);
    localStorage.removeItem(LOCAL_STORAGE.FEATURE_FLAGS);
    
    // Redirect to login
    window.location.href = '/auth/login';
};

export const fetchDataAndProceedWithToolkit = async (config, helpers) => {
    try {
        const { url, method = 'GET', data, params } = config;
        const response = await apiClient({
            url,
            method,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        return helpers.rejectWithValue(error.response?.data || error.message);
    }
};

export default apiClient;
