import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import countSliceReducer from "~/redux/slices/count-slice";
import sidebarSliceReducer from "~/redux/slices/siderbar-slice";

const persistConfig = {
  key: "root",
  whitelist: ["sidebar"],
  timeout: 2000,
  blacklist: ["patientRegistration"],
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    counter: countSliceReducer,
    sidebar: sidebarSliceReducer
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["payload"]
      }
    })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
