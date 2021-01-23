import React, { useRef, useEffect, useState } from "react";
import moment from "moment";

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

// Styling import
import styles from "./WalletTimeFilter.module.css";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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
    fontWeight: "bold",
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

  //  useState for window innerWidth
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  const earnings = useSelector((state) => state.earnings.earnings);
  const dateFromSelector = useSelector((state) => state.expenses.from);
  const dateToSelector = useSelector((state) => state.expenses.to);

  // useState
  const [from, setFrom] = useState(moment().format("YYYY-MM-DD"));
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  // Functions

  const refreshData = () => {
    // convert date from String to Date
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const subExp = [];
    const subEarn = [];

    console.log(fromDate + toDate);

    // select data of expenses.expenses Slice between from and to
    expenses.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (expenseDate >= fromDate && expenseDate <= toDate) {
        subExp.push(expense);
      }
    });

    dispatch(setSubExpenses(subExp));

    // select data of earnings.earnings Slice between from and to
    earnings.forEach((earning) => {
      let earningDate = new Date(earning.date);
      if (earningDate >= fromDate && earningDate <= toDate) {
        subEarn.push(earning);
      }
    });

    dispatch(setSubEarnings(subEarn));
  };

  // Refresh subExpenses and subEarnings after changing the dates
  const refresh = (e) => {
    e.preventDefault();

    // Update from and to in the Redux datastore
    dispatch(setDateFrom(from));
    dispatch(setDateTo(to));
    dispatch(setDateFromEarnings(from));
    dispatch(setDateToEarnings(to));

    refreshData();
  };

  // This useEffect is used for updating subExpenses and subEarnings in the Redux Store when the user creates a new earning or expense
  useEffect(() => {
    console.log("refresh data");
    refreshData();
  }, [expenses, earnings]);

  // Initial useEffect in order to set the state of from and to
  useEffect(() => {
    dispatch(setDateFrom(from));
    dispatch(setDateTo(to));
    dispatch(setDateFromEarnings(from));
    dispatch(setDateToEarnings(to));
  }, []);

  return (
    <div className={styles.box}>
      <TextField
        label="From"
        type="date"
        value={from}
        InputProps={{
          classes: classesTextField,
        }}
        InputLabelProps={{
          classes: classesTextFieldLabel,
        }}
        className={classes.datePicker}
        onChange={(e) => setFrom(e.target.value)}
      />
      <TextField
        label="To"
        type="date"
        value={to}
        InputProps={{
          classes: classesTextField,
        }}
        InputLabelProps={{
          classes: classesTextFieldLabel,
        }}
        className={classes.datePicker}
        onChange={(e) => setTo(e.target.value)}
      />
      <Button className={classes.refreshButton} onClick={(e) => refresh(e)}>
        <RefreshIcon className={classes.refreshIcon} />
        {windowWidth > 480 ? "Refresh" : ""}
      </Button>
    </div>
  );
}

export default WalletTimeFilter;
