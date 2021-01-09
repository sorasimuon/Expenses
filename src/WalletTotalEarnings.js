import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import { useSelector } from "react-redux";

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
    backgroundColor: teal[400],
    color: "white",
    [theme.breakpoints.down(800)]: {
      gridColumn: "2 / 3",
      gridRow: "1 / 2",
    },
  },
  elem1: {
    gridColumn: "1 / 1",
    gridRow: "1 / 1",
  },
  elem2: {
    gridColumn: "1 / 1",
    gridRow: "2 / 2",
  },
  icon: {
    gridColumn: "2 / 2",
    gridRow: "1 / span 2",
    color: "white",
    width: 50,
    height: 50,
    alignSelf: "center",
  },
}));

function WalletTotalEarnings() {
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
      <h4 className={classes.elem1}>Total Earnings </h4>
      <h2>{total} EUR</h2>
      <MonetizationOnIcon className={classes.icon} />
    </div>
  );
}

export default WalletTotalEarnings;
