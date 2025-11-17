import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import initialState from './initialState';
import { LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD } from './api';
import { METHOD_TYPES } from "../../utils/constants";

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAuthState(state, action) {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: (builder) => {

    }
});

export const login = createAsyncThunk(
    LOGIN,
    async (data = {}, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: LOGIN,
            method: METHOD_TYPES.POST,
            data,
            authLoader: true
        },
        helpers
    )
);

export const { updateAuthState } = authSlice.actions;
export default authSlice.reducer;