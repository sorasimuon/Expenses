import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  subExpenses: [],
  dateFrom: "1970-01-01",
  dateTo: "1970-01-01",
  reload: false,
  alertAdd: "",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses(state, action) {
      return {
        ...state,
        expenses: action.payload,
      };
    },
    setDateFrom(state, action) {
      return {
        ...state,
        dateFrom: action.payload,
      };
    },
    setDateTo(state, action) {
      return {
        ...state,
        dateTo: action.payload,
      };
    },
    setSubExpenses(state, action) {
      return {
        ...state,
        subExpenses: action.payload,
      };
    },
    switchReload(state, action) {
      return {
        ...state,
        reload: !state.reload,
      };
    },
    changeAlertAdd(state, action) {
      return {
        ...state,
        alertAdd: action.payload,
      };
    },
  },
});

export const {
  setExpenses,
  setDateFrom,
  setDateTo,
  setSubExpenses,
  switchReload,
  changeAlertAdd,
} = expensesSlice.actions;

export default expensesSlice.reducer;
