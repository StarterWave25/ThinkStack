
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authAPI } from "../services/authAPI";
import { problemsAPI } from "../services/problemsAPI";
import { draftAPI } from "../services/draftAPI";


export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [problemsAPI.reducerPath]: problemsAPI.reducer,
        [draftAPI.reducerPath]: draftAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authAPI.middleware,
            problemsAPI.middleware,
            draftAPI.middleware
        ),
});

setupListeners(store.dispatch);