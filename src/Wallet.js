import { Badge } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import styles from "./Wallet.module.css";
import Chart from "chart.js";
import WalletExpenseGrid from "./WalletExpenseGrid";
import WalletTotalExpenses from "./WalletTotalExpenses";
import WalletTotalEarnings from "./WalletTotalEarnings";
import isEmpty from "is-empty";
import axiosExpenses from "./apis/axiosExpenses";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpenses,
  setDateFrom,
  setDateTo,
  setSubExpenses,
} from "./features/expensesSlice";
import { setUser } from "./features/userSlice";
import Loader from "./Loader";
import MenuTheme from "./MenuTheme";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import WalletFilter from "./WalletFilter";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { teal, deepOrange } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import Snackbar from "@material-ui/core/Snackbar";
import walletLogo from "./img/wallet.png";

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
  appBar: {
    backgroundColor: teal[600],
    display: "flex",
  },
  appBarIcon: {
    color: "white",
    fontSize: 30,
    focusVisible: false,
    "&:focus": {
      color: deepOrange[500],
    },
  },
  rowChart: {
    display: "flex",
    alignItems: "flex-start",
  },
  logo: {
    position: "relative",
    width: 40,
    height: 40,
    marginRight: 20,
  },
  titleLogo: {
    color: "white",
  },
}));

function Wallet() {
  const classes = useStyles();

  // useState variables
  const [isLoading, setIsLoading] = useState(false);

  // Redux : dispatch and selectors
  const dispatch = useDispatch();
  const dateFromSelector = useSelector((state) => state.expenses.dateFrom);
  const dateToSelector = useSelector((state) => state.expenses.dateTo);
  const reload = useSelector((state) => state.expenses.reload);
  const alertAdd = useSelector((state) => state.expenses.alertAdd);

  // useEffect
  useEffect(() => {
    // Fetch expenses from DB
    (async () => {
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
    })();
  }, [reload]);

  return (
    <div className={styles.wallet}>
      {/* Navigation Bar */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.root}>
            <img src={walletLogo} alt="logo" className={classes.logo} />
            <h3 className={classes.logoTitle}>Wallet</h3>
          </div>
          <div className={classes.grow} />
          <div className={classes.root}>
            <h3 className={classes.logoTitle}>
              {dateFromSelector} / {dateToSelector}
            </h3>
          </div>
          <div className={classes.grow} />
          <div className={classes.root}>
            <MenuTheme />

            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <ChatIcon className={classes.appBarIcon} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent="" color="secondary">
                <AccountCircleIcon className={classes.appBarIcon} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={styles.mainContainer}>
        {/* Filters */}
        <WalletFilter />
        {/* Big Focus */}
        <div className={classes.rowChart}>
          <WalletTotalExpenses />
          <WalletTotalEarnings />
        </div>
        {/* Chart Expenses */}
        <div className={classes.rowChart}>
          <BarChart />
          <PieChart />
        </div>
        {/* Grid Expenses */}
        <div className={styles.boxExpenseGrid}>
          {isLoading ? <Loader /> : <WalletExpenseGrid />}
        </div>
        {/* <Snackbar
          anchorOrigin={("bottom", "left")}
          open={!isEmpty(alertAdd) ? true : false}
          message={
            alertAdd === "success"
              ? " SUCCESS : New expense added"
              : "Something wrong occured during insertion"
          }
          key={"bottomleft"}
        /> */}
      </div>
    </div>
  );
}

export default Wallet;
