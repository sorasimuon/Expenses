import { Badge } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";

// Import React Components
import WalletNavBar from "./WalletNavBar";
import WalletTimeFilter from "./WalletTimeFilter";
import WalletMainContainer from "./WalletMainContainer";
import WalletNewExpense from "./WalletNewExpense";

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

  // Redux : dispatch and selectors
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.expenses.reload);
  const alertAdd = useSelector((state) => state.expenses.alertAdd);

  // useEffect
  useEffect(() => {
    // Fetch expenses from DB
    (async () => {
      try {
        const userId = "5f04994667fcbfe11f771712";
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
        dispatch(setUser(userId));
        dispatch(setExpenses(content));
      } catch (error) {}
    })();
  }, [reload]);

  return (
    <div className={styles.wallet}>
      <WalletNavBar />
      <div className={styles.filterContainer}>
        <div
          style={{
            gridColumn: "1 / 1",
            display: "flex",
          }}
        >
          <WalletNewExpense />
        </div>
        <WalletTimeFilter style="grid-column: 2/2" />
      </div>
      <WalletMainContainer />
    </div>
  );
}

export default Wallet;
