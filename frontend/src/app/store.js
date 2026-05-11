
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authAPI } from "../services/authAPI";
import { problemsAPI } from "../services/problemsAPI";
import { draftAPI } from "../services/draftAPI";
import { evaluateAPI } from "../services/evaluateAPI";


export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [problemsAPI.reducerPath]: problemsAPI.reducer,
        [draftAPI.reducerPath]: draftAPI.reducer,
        [evaluateAPI.reducerPath]: evaluateAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authAPI.middleware,
            problemsAPI.middleware,
            draftAPI.middleware,
            evaluateAPI.middleware
        ),
});

setupListeners(store.dispatch);