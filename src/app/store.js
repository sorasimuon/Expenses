import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/expensesSlice";
import earningsReducer from "../features/earningsSlice";
import themeReducer from "../features/themeSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    expenses: expensesReducer,
    earnings: earningsReducer,
    theme: themeReducer,
    user: userReducer,
  },
});
