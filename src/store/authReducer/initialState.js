import { getDataFromLocalStorage } from "../../utils/common";
import { LOCAL_STORAGE } from "../../utils/constants";

const initialState = {
    userInfo: getDataFromLocalStorage(LOCAL_STORAGE.APP_USER, null),
    accessToken: getDataFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN, null),
    refreshToken: getDataFromLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, null),
    featureFlags: getDataFromLocalStorage(LOCAL_STORAGE.FEATURE_FLAGS, null)
};