import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo, TodoSliceState } from "./types";

const initialState: TodoSliceState = {
  items: [
    {
      id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
      title: "Сделать тестовое",
      description: "React + TypeScript + Redux + Antd",
      complete: true,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ITodo[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = todoSlice.actions;

export default todoSlice.reducer;
