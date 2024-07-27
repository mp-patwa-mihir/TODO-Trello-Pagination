import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  completedTodo: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo(state, action) {
      state.todo = action.payload;
    },
    setCompletedTodo(state, action) {
      state.completedTodo = action.payload;
    },
  },
});

export const { setTodo, setCompletedTodo } = todoSlice.actions;
export default todoSlice.reducer;
