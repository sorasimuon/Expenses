import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setExpenses,
  setDateFrom,
  setDateTo,
  setSubExpenses,
} from "./features/expensesSlice";

// Import Design elements + Material-UI
import styles from "./WalletNavBar.module.css";
import { makeStyles } from "@material-ui/core";
import { teal, deepOrange } from "@material-ui/core/colors";
import MenuTheme from "./MenuTheme";
import MenuUser from "./MenuUser";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import Snackbar from "@material-ui/core/Snackbar";
import walletLogo from "./img/wallet.png";
import Badge from "@material-ui/core/Badge";

// Define Styles Material-UI
const useStyles = makeStyles((theme) => ({
  appBar: {
    gridColumnStart: 1,
    gridRowStart: 1,
    backgroundColor: teal[600],
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  rowSection: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    position: "relative",
    width: 40,
    height: 40,
    [theme.breakpoints.down(460)]: {
      width: 24,
      height: 24,
    },
    marginRight: 5,
  },
  titleLogo: {
    color: "white",
    margin: 0,
  },
  grow: {
    flexGrow: 1,
  },
  date: {
    color: "white",
    fontSize: 18,
    margin: "0px 10px 0px 10px",
    [theme.breakpoints.down(460)]: {
      fontSize: 12,
    },
  },
  appBarIcon: {
    color: "white",
    fontSize: 30,
    focusVisible: false,
    "&:focus": {
      color: deepOrange[500],
    },
    [theme.breakpoints.down(460)]: {
      fontSize: 24,
    },
  },
  gridElement1: {
    gridColumnStart: 1,
    "&:focus": { outline: "none" },
    [theme.breakpoints.down(460)]: {
      width: "auto",
    },
  },
  gridElement2: { gridColumnStart: 2, "&:focus": { outline: "none" } },
  gridElement3: { gridColumnStart: 3, "&:focus": { outline: "none" } },
}));

function WalletNavBar() {
  //useStyles from Material-UI
  const classes = useStyles();

  // UseStates
  const [windowWidth, setWindowWidth] = useState();

  // Redux : dispatch and selectors
  const dateFromSelector = useSelector((state) => state.expenses.dateFrom);
  const dateToSelector = useSelector((state) => state.expenses.dateTo);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [window.Width]);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.rowSection}>
          <img src={walletLogo} alt="logo" className={classes.logo} />
          {windowWidth > 480 && <h1 className={classes.titleLogo}>Wallet</h1>}
        </div>
        <div className={classes.rowSection}>
          <h2 className={classes.date}>
            {new Date(dateFromSelector).getDate()}-
            {new Date(dateFromSelector).getMonth() + 1}-
            {new Date(dateFromSelector).getFullYear()}
          </h2>
          <h2 className={classes.date}>
            {new Date(dateFromSelector).getDate()}-
            {new Date(dateFromSelector).getMonth() + 1}-
            {new Date(dateFromSelector).getFullYear()}
          </h2>
        </div>
        <div className={styles.gridMenu}>
          {/* <MenuTheme />
          <IconButton size="small" className={classes.gridElement2}>
            <Badge badgeContent={4} color="secondary">
              <ChatIcon className={classes.appBarIcon} />
            </Badge>
          </IconButton> */}
          <MenuUser />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default WalletNavBar;
