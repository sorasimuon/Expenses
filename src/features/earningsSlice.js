import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  earnings: [],
  subEarnings: [],
  dateFrom: "",
  dateTo: "",
  reload: false,
  alertAdd: "",
};

const earningsSlice = createSlice({
  name: "earnings",
  initialState,
  reducers: {
    setEarnings(state, action) {
      return {
        ...state,
        earnings: action.payload,
      };
    },
    setDateFromEarnings(state, action) {
      return {
        ...state,
        dateFrom: action.payload,
      };
    },
    setDateToEarnings(state, action) {
      return {
        ...state,
        dateTo: action.payload,
      };
    },
    setSubEarnings(state, action) {
      return {
        ...state,
        subEarnings: action.payload,
      };
    },
    switchReloadEarnings(state, action) {
      return {
        ...state,
        reload: !state.reload,
      };
    },
    changeAlertAddEarnings(state, action) {
      return {
        ...state,
        alertAdd: action.payload,
      };
    },
  },
});

export const {
  setEarnings,
  setDateFromEarnings,
  setDateToEarnings,
  setSubEarnings,
  switchReloadEarnings,
  changeAlertAddEarnings,
} = earningsSlice.actions;

export default earningsSlice.reducer;
