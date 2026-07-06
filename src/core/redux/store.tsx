// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducer';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
import { baseApi } from "./services/baseApi";

// Persist config. The RTK Query cache ('api') is blacklisted so stale server data
// is never rehydrated from localStorage — it refetches fresh on load.
const persistConfig = {
  key: "root",
  storage,
  blacklist: [baseApi.reducerPath],
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(baseApi.middleware),
});

// Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Persistor
export const persistor = persistStore(store);

export default store;

