import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./authReducer";

const appReducer = combineReducers({
    auth: authReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        let middleware = getDefaultMiddleware().concat();
        if (import.meta.env.NODE_ENV !== "production")
            middleware = middleware.concat(logger);
        return middleware;
    },
    devTools: import.meta.env.NODE_ENV !== "production"
});

export default store;