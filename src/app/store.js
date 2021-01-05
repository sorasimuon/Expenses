import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/expensesSlice";
import themeReducer from "../features/themeSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    expenses: expensesReducer,
    theme: themeReducer,
    user: userReducer,
  },
});
