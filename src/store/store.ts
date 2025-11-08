import { configureStore } from "@reduxjs/toolkit";
import typesReducer from "./typesSlice";
import itemsReducer from "./itemsSlice";

export const store = configureStore({
  reducer: {
    types: typesReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;