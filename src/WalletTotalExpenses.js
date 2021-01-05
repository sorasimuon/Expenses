import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";
import { PlayCircleFilledWhite } from "@material-ui/icons";
import { teal, deepOrange } from "@material-ui/core/colors";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 0 10px 0 rgba(150, 150, 150, 0.3)",
    borderRadius: 4,
    padding: 10,
    backgroundColor: deepOrange[700],
    color: "white",
    margin: 10,
    width: "50vw",
    maxHeight: 200,
  },
  columnBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    color: "white",
    width: 70,
    height: 70,
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
    return result;
  };

  //useEffect

  useEffect(() => {
    setTotal(getTotalSubExpenses());
  }, [subExpenses]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.columnBox}>
        <h7>Total Expenses (EUR)</h7>
        <h2>{total}</h2>
      </div>
      <MonetizationOnIcon className={classes.icon} />
    </div>
  );
}

export default WalletTotalExpenses;
