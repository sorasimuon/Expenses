import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import { useSelector } from "react-redux";

// import React Components
import WalletNewExpense from "./WalletNewExpense";

import { makeStyles } from "@material-ui/core";
import { PlayCircleFilledWhite } from "@material-ui/icons";
import { teal, deepOrange } from "@material-ui/core/colors";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    gridTemplateRows: "auto [row1] 1fr [row2]",
    gridTemplateColumns: "1fr [col1] auto [col2]",
    boxShadow: "0 0 10px 0 rgba(75, 75, 75, 0.5)",
    borderRadius: 4,
    padding: 10,
    backgroundColor: deepOrange[400],
    color: "white",
    [theme.breakpoints.down(601)]: {
      gridColumn: "1 / 2",
      gridRow: "1 / 2",
    },
    [theme.breakpoints.down(600)]: {
      gridColumn: "1 / 3",
      gridRow: "1 / 1",
    },
  },
  elem1: {
    color: "rgba(255,255,255,0.5)",
    gridColumn: "1 / 1",
    gridRow: "1 / 1",
  },
  elem2: {
    gridColumn: "1 / 1",
    gridRow: "2 / 2",
  },
}));

function WalletTotalExpenses() {
  //useStyles
  const classes = useStyles();
  // useState
  const [total, setTotal] = useState();

  // useSelector
  const subExpenses = useSelector((state) => state.expenses.subExpenses);

  // Functions
  const getTotalSubExpenses = () => {
    let result = 0;
    if (!isEmpty(subExpenses)) {
      for (let expense of subExpenses) {
        result += expense.amount;
      }
    }
    return Math.round(result * 100) / 100;
  };

  //useEffect
  useEffect(() => {
    setTotal(getTotalSubExpenses());
  }, [subExpenses]);

  return (
    <div className={classes.mainContainer}>
      <h5 className={classes.elem1}>Total Expenses </h5>
      <WalletNewExpense />
      <h2>{!isEmpty(total) && total}</h2>
    </div>
  );
}

export default WalletTotalExpenses;
