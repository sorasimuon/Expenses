import React, { useRef, useEffect, useState } from "react";

// Redux Import
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  setDateFrom,
  setDateTo,
  setSubExpenses,
} from "./features/expensesSlice";
import WalletNewExpense from "./WalletNewExpense";

// Styling import
import styles from "./WalletTimeFilter.module.css";
import { makeStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { teal, grey, lightBlue } from "@material-ui/core/colors";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 200,
    alignSelf: "center",
  },
  dateRangeButton: {
    fontWeight: "bold",
    color: grey[600],
  },
  refreshButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal[500],
    color: "white",
    borderRadius: "4px",
    padding: 10,
    marginLeft: 20,
    "&:hover": {
      backgroundColor: teal[300],
    },
    "&:focus": {
      outline: "none",
    },
  },
  refreshIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStylesTextField = makeStyles((theme) => ({
  root: {
    color: teal[300],
    outline: "none",
    [theme.breakpoints.down(380)]: {
      fontSize: 10,
    },
    "&$focused": {
      color: lightBlue[300],
      borderBottomColor: teal[300],
    },
  },
  focused: {},
}));

function WalletTimeFilter() {
  // Styling function
  const classes = useStyles();
  const classesTextField = useStylesTextField();

  // useRef variables
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  // Dispatch for Reducer Redux
  const dispatch = useDispatch();

  // Selector of redux data store
  const expenses = useSelector((state) => state.expenses.expenses);
  const subExpenses = useSelector((state) => state.expenses.subExpenses);

  // Functions

  const selectData = (from, to) => {
    // convert date from String to Date
    from = new Date(from);
    to = new Date(to);
    const subExp = [];

    // select data of expenses.expenses Slice between from and to
    expenses.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (expenseDate >= from && expenseDate <= to) {
        subExp.push(expense);
      }
    });

    dispatch(setSubExpenses(subExp));
  };

  const dataRefresh = (e) => {
    e.preventDefault();

    const from = dateFromRef.current.value;
    const to = dateToRef.current.value;

    // save date to Redux store
    dispatch(setDateFrom(from));
    dispatch(setDateTo(to));

    selectData(from, to);
  };

  useEffect(() => {
    const from = dateFromRef.current.value;
    const to = dateToRef.current.value;
    selectData(from, to);
  }, [expenses]);

  return (
    <div className={styles.box}>
      <TextField
        inputRef={dateFromRef}
        label="From"
        type="date"
        defaultValue="1970-01-01"
        InputLabelProps={{
          classes: classesTextField,
        }}
        className={classes.datePicker}
      />
      <TextField
        inputRef={dateToRef}
        label="To"
        type="date"
        defaultValue="1970-01-01"
        InputLabelProps={{
          classes: classesTextField,
        }}
        className={classes.datePicker}
      />

      <Button className={classes.refreshButton} onClick={(e) => dataRefresh(e)}>
        <RefreshIcon className={classes.refreshIcon} />
        Refresh
      </Button>
    </div>
  );
}

export default WalletTimeFilter;
