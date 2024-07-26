import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import docReducer from "../slices/documentSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    docs: docReducer,
  },
});