import { Badge } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

// Import React Components
import WalletNavBar from "./WalletNavBar";
import WalletTimeFilter from "./WalletTimeFilter";
import WalletMainContainer from "./WalletMainContainer";
import WalletNewExpense from "./WalletNewExpense";
import WalletNewEarnings from "./WalletNewEarnings";

import isEmpty from "is-empty";
import axiosExpenses from "./apis/axiosExpenses";

// Import related to Redux
import { useSelector, useDispatch } from "react-redux";
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
import { setUser } from "./features/userSlice";

// Import Styling + Material-UI
import styles from "./Wallet2.module.css";
import { makeStyles } from "@material-ui/core";
import { teal, deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  searchIconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
  searchBar: {
    display: "flex",
    backgroundColor: teal[400],
    borderRadius: 4,
    "&:hover": {
      backgroundColor: teal[300],
    },
  },
  rowChart: {
    display: "flex",
    alignItems: "flex-start",
  },
}));

function Wallet() {
  const classes = useStyles();

  // useState variables
  const [isLoading, setIsLoading] = useState(false);
  const [errorEarnings, setErrorEarnings] = useState([]);
  const [errorExpenses, setErrorExpenses] = useState([]);

  // Redux : dispatch and selectors
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.expenses.reload);
  const alertAdd = useSelector((state) => state.expenses.alertAdd);
  const userId = useSelector((state) => state.user.userId);

  // other Hooks
  const history = useHistory();

  // useEffect
  useEffect(() => {
    // Fetch earnings from DB
    (async () => {
      try {
        const URL = `/earnings?userId=${userId}`;
        setIsLoading(true);
        const response = await axiosExpenses.get(URL);
        setIsLoading(false);

        const content = [];
        for (let earning of response.data) {
          let temp = {};
          temp.id = earning._id;
          temp.userId = earning.userId;
          temp.date = parseInt(earning.date);
          temp.name = earning.name;
          temp.source_type = earning.source_type;
          temp.type = earning.type;
          temp.amount = parseFloat(earning.amount);
          temp.currency = earning.currency;
          delete earning._id;
          content.push(temp);
        }
        dispatch(setEarnings(content));
      } catch (error) {
        switch (error.response.status) {
          case 400:
            setErrorEarnings("No data ");
            console.log("No data retrieved for this user");
            break;
          default:
            setErrorEarnings("Error on request");
        }
      }
    })();

    // Fetch expenses from DB
    (async () => {
      try {
        const URL = `/expenses?userId=${userId}`;
        setIsLoading(true);

        const response = await axiosExpenses.get(URL);
        setIsLoading(false);

        const content = [];
        for (let expense of response.data) {
          let temp = {};
          temp.id = expense._id;
          temp.userId = expense.userId;
          temp.date = parseInt(expense.date);
          temp.name = expense.name;
          temp.categories = expense.categories;
          temp.source_type = expense.source_type;
          temp.type = expense.type;
          temp.amount = parseFloat(expense.amount);
          temp.currency = expense.currency;
          delete expense._id;
          content.push(temp);
        }
        dispatch(setExpenses(content));
      } catch (error) {}
    })();
  }, [reload]);

  return (
    <div className={styles.wallet}>
      <WalletNavBar />
      <div className={styles.filterContainer}>
        <WalletTimeFilter />
      </div>
      <WalletMainContainer />
    </div>
  );
}

export default Wallet;
