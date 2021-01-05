import React, { useEffect } from "react";
import styles from "./WalletExpenseGrid.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setWalletTheme } from "./features/themeSlice";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

function Loader() {
  const themeWallet = useSelector((state) => state.theme).wallet;

  const useStyles = makeStyles(() => ({
    progress: {
      margin: "auto",
      color: themeWallet,
    },
  }));

  const classes = useStyles();

  return (
    <div className={styles.walletExpenseGrid}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default Loader;
