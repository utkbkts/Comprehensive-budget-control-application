import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    setIncome: (state, action) => {
      const { updatedUser } = state.user;
      if (updatedUser && updatedUser.incomeList) {
        updatedUser.incomeList = action.payload.incomeList;
      } else {
        state.user.incomeList = action.payload.incomeList;
      }
    },
    setProducts: (state, action) => {
      const { updatedUser } = state.user;
      if (updatedUser && updatedUser.productList) {
        updatedUser.productList = action.payload.productList;
      } else {
        state.user.productList = action.payload.productList;
      }
    },
    setExpense: (state, action) => {
      const { updatedUser } = state.user;
      if (updatedUser && updatedUser.expenseList) {
        updatedUser.expenseList = action.payload.expenseList;
      } else {
        state.user.expenseList = action.payload.expenseList;
      }
    },
    setTodoList: (state, action) => {
      const { updatedUser } = state.user;
      if (updatedUser && updatedUser.todoList) {
        updatedUser.todoList = action.payload.todoList;
      } else {
        state.user.todoList = action.payload.todoList;
      }
    },
    setRemoveTodoList: (state, action) => {
      const { updatedUser } = state.user;
      if (updatedUser && updatedUser.todoList) {
        updatedUser.todoList = updatedUser.todoList.filter(
          (todo) => todo._id !== action.payload.todoId
        );
      } else {
        state.user.todoList = state.user.todoList.filter(
          (todo) => todo._id !== action.payload.todoId
        );
        console.log(action.payload.todoList);
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  updateUser,
  setIncome,
  setProducts,
  setExpense,
  setTodoList,
  setRemoveTodoList,
} = userSlice.actions;
export default userSlice.reducer;
