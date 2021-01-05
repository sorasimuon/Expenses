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
import styles from "./WalletFilter.module.css";
import { makeStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { teal, grey } from "@material-ui/core/colors";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 200,
  },
  dateRangeButton: {
    fontWeight: "bold",
    color: grey[600],
  },
  grow: {
    flexGrow: 1,
  },
  refreshButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal[500],
    color: "white",
    borderRadius: "100vh",
    padding: 10,
    marginLeft: 20,
    "&:hover": {
      backgroundColor: teal[300],
    },
  },
  refreshIcon: {
    marginRight: theme.spacing(1),
  },
}));

function WalletFilter() {
  // Styling function
  const classes = useStyles();

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
    <div className={`${styles.filterSection} ${styles.box}`}>
      <div className={styles.columnBox}>
        <div className={styles.datePickerSection}>
          <TextField
            inputRef={dateFromRef}
            label="From"
            type="date"
            defaultValue="1970-01-01"
            className={classes.datePicker}
          />
          <TextField
            inputRef={dateToRef}
            label="To"
            type="date"
            defaultValue="1970-01-01"
            className={classes.datePicker}
          />
        </div>
        {/* <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button className={classes.dateRangeButton}>1D</Button>
          <Button className={classes.dateRangeButton}>5D</Button>
          <Button className={classes.dateRangeButton}>1M</Button>
          <Button className={classes.dateRangeButton}>6M</Button>
          <Button className={classes.dateRangeButton}>YTD</Button>
          <Button className={classes.dateRangeButton}>1Y</Button>
          <Button className={classes.dateRangeButton}>5Y</Button>
          <Button className={classes.dateRangeButton}>Max</Button>
        </ButtonGroup> */}
      </div>
      <Button className={classes.refreshButton} onClick={(e) => dataRefresh(e)}>
        <RefreshIcon className={classes.refreshIcon} />
        Refresh
      </Button>
      <div className={classes.grow} />

      <WalletNewExpense />
    </div>
  );
}

export default WalletFilter;
