import React, { useRef, useEffect, useState } from "react";

// Redux Import
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  setDateFrom,
  setDateTo,
  setSubExpenses,
} from "./features/expensesSlice";
import {
  setEarnings,
  setDateFromEarnings,
  setDateToEarnings,
  setSubEarnings,
} from "./features/earningsSlice";

import WalletNewExpense from "./WalletNewExpense";

// Styling import
import styles from "./WalletTimeFilter.module.css";
import { makeStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { teal, grey, lightBlue } from "@material-ui/core/colors";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";

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
    [theme.breakpoints.down(520)]: {
      fontSize: 12,
      marginLeft: 5,
    },
  },
  refreshIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStyleTextFieldLabel = makeStyles((theme) => ({
  root: {
    outline: "none",
    [theme.breakpoints.down(380)]: {},
    "&$focused": {},
  },
  focused: {},
}));

const useStyleTextField = makeStyles((theme) => ({
  root: {
    outline: "none",
    [theme.breakpoints.down(380)]: {
      fontSize: 12,
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
  const classesTextFieldLabel = useStyleTextFieldLabel();
  const classesTextField = useStyleTextField();

  // useRef variables
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  //  useState fro window innerWidth
  const [windowWidth, setWindowWidth] = useState();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  });

  // Dispatch for Reducer Redux
  const dispatch = useDispatch();

  // Selector of redux data store
  const expenses = useSelector((state) => state.expenses.expenses);
  const subExpenses = useSelector((state) => state.expenses.subExpenses);
  const earnings = useSelector((state) => state.earnings.earnings);
  const subEarnings = useSelector((state) => state.earnings.subEarnings);

  // Functions

  const selectData = (from, to) => {
    // convert date from String to Date
    from = new Date(from);
    to = new Date(to);
    const subExp = [];
    const subEarn = [];

    // select data of expenses.expenses Slice between from and to
    expenses.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (expenseDate >= from && expenseDate <= to) {
        subExp.push(expense);
      }
    });

    dispatch(setSubExpenses(subExp));

    // select data of earnings.earnings Slice between from and to
    earnings.forEach((earning) => {
      let earningDate = new Date(earning.date);
      if (earningDate >= from && earningDate <= to) {
        subEarn.push(earning);
      }
    });

    dispatch(setSubEarnings(subEarn));
  };

  const dataRefresh = (e) => {
    e.preventDefault();

    const from = dateFromRef.current.value;
    const to = dateToRef.current.value;

    // save date to Redux store
    dispatch(setDateFrom(from));
    dispatch(setDateTo(to));
    dispatch(setDateFromEarnings(from));
    dispatch(setDateToEarnings(to));

    selectData(from, to);
  };

  useEffect(() => {
    const from = dateFromRef.current.value;
    const to = dateToRef.current.value;
    selectData(from, to);
  }, [expenses, earnings]);

  return (
    <div className={styles.box}>
      <TextField
        inputRef={dateFromRef}
        label="From"
        type="date"
        defaultValue="1970-01-01"
        InputProps={{
          classes: classesTextField,
        }}
        InputLabelProps={{
          classes: classesTextFieldLabel,
        }}
        className={classes.datePicker}
      />
      <TextField
        inputRef={dateToRef}
        label="To"
        type="date"
        defaultValue="1970-01-01"
        InputProps={{
          classes: classesTextField,
        }}
        InputLabelProps={{
          classes: classesTextFieldLabel,
        }}
        className={classes.datePicker}
      />

      {windowWidth > 520 ? (
        <Button
          className={classes.refreshButton}
          onClick={(e) => dataRefresh(e)}
        >
          <RefreshIcon className={classes.refreshIcon} />
          Refresh
        </Button>
      ) : (
        <IconButton
          className={classes.refreshButton}
          onClick={(e) => dataRefresh(e)}
        >
          <RefreshIcon />
        </IconButton>
      )}
    </div>
  );
}

export default WalletTimeFilter;
