import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from './initialState';
import { LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD, REFRESH_TOKEN } from './api';
import { METHOD_TYPES } from "../../utils/constants";
import { fetchDataAndProceedWithToolkit } from "../../utils/api";
import { setDataInLocalStorage } from "../../utils/common";
import { LOCAL_STORAGE } from "../../utils/constants";

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAuthState(state, action) {
            return { ...state, ...action.payload };
        },
        clearAuthState(state) {
            localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE.APP_USER);
            localStorage.removeItem(LOCAL_STORAGE.FEATURE_FLAGS);
            return {
                ...initialState,
                userInfo: null,
                accessToken: null,
                refreshToken: null,
                featureFlags: null
            };
        },
        setTokens(state, action) {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            setDataInLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
            if (refreshToken) {
                setDataInLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.data.user;
                state.accessToken = action.payload.data.tokens.accessToken;
                state.refreshToken = action.payload.data.tokens.refreshToken;
                state.featureFlags = action.payload.featureFlags;

                // Save to localStorage
                setDataInLocalStorage(LOCAL_STORAGE.APP_USER, action.payload.data.user);
                setDataInLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, action.payload.data.tokens.accessToken);
                setDataInLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, action.payload.data.tokens.refreshToken);
                if (action.payload.featureFlags) {
                    setDataInLocalStorage(LOCAL_STORAGE.FEATURE_FLAGS, action.payload.featureFlags);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Refresh Token
            .addCase(refreshToken.pending, (state) => {
                state.refreshing = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.refreshing = false;
                state.accessToken = action.payload.data.accessToken;
                if (action.payload.data.refreshToken) {
                    state.refreshToken = action.payload.data.refreshToken;
                }

                // Update localStorage
                setDataInLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, action.payload.data.accessToken);
                if (action.payload.data.refreshToken) {
                    setDataInLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, action.payload.refreshToken);
                }
            })
            .addCase(refreshToken.rejected, (state) => {
                state.refreshing = false;
                // Clear auth state on refresh token failure
                state.userInfo = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.featureFlags = null;
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.featureFlags = null;

                // Clear localStorage
                localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
                localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
                localStorage.removeItem(LOCAL_STORAGE.APP_USER);
                localStorage.removeItem(LOCAL_STORAGE.FEATURE_FLAGS);
            });
    }
});

// Async actions
export const login = createAsyncThunk(
    LOGIN,
    async (data = {}, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: LOGIN,
            method: METHOD_TYPES.POST,
            data,
        },
        helpers
    )
);

export const refreshToken = createAsyncThunk(
    REFRESH_TOKEN,
    async (_, helpers) => {
        const state = helpers.getState();
        const token = state.auth.refreshToken;

        return fetchDataAndProceedWithToolkit(
            {
                url: REFRESH_TOKEN,
                method: METHOD_TYPES.POST,
                data: { refreshToken: token },
            },
            helpers
        );
    }
);

export const logout = createAsyncThunk(
    LOGOUT,
    async (_, helpers) => {
        const state = helpers.getState();
        const token = state.auth.refreshToken;

        return fetchDataAndProceedWithToolkit(
            {
                url: LOGOUT,
                method: METHOD_TYPES.POST,
                data: { refreshToken: token }
            },
            helpers
        );
    }
);

export const forgotPassword = createAsyncThunk(
    FORGOT_PASSWORD,
    async (data = {}, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: FORGOT_PASSWORD,
            method: METHOD_TYPES.POST,
            data,
        },
        helpers
    )
);

export const resetPassword = createAsyncThunk(
    RESET_PASSWORD,
    async (data = {}, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: RESET_PASSWORD,
            method: METHOD_TYPES.POST,
            data,
        },
        helpers
    )
);

export const { updateAuthState, clearAuthState, setTokens } = authSlice.actions;
export default authSlice.reducer;