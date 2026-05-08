
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authAPI } from "../services/authAPI";
import { problemsAPI } from "../services/problemsAPI";


export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [problemsAPI.reducerPath]: problemsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authAPI.middleware,
            problemsAPI.middleware,
        ),
});

setupListeners(store.dispatch);