import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from "@/redux/slices/userSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import baseApi from './api/baseApi';

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userSlice'],
}

const reducer = combineReducers({
      userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReduces = persistReducer(persistConfig, reducer);

export const makeStore = configureStore({
    reducer: persistedReduces,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
})

// Create a persistor instance
export const Persistor = persistStore(makeStore);

// Infer the types
export type AppStore = typeof makeStore;
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;