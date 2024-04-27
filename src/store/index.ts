import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todos from "./todos/slice";

export const store = configureStore({
  reducer: {
    todos,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
