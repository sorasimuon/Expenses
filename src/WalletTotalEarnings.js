import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import { useSelector } from "react-redux";

// Import React Components
import WalletNewEarnings from "./WalletNewEarnings";

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
    color: "white",
    backgroundColor: teal[400],
    [theme.breakpoints.up(601)]: {
      gridColumn: "2 / 3",
      gridRow: "1 / 2",
    },
    [theme.breakpoints.down(600)]: {
      gridColumn: "1 / 3",
      gridRow: "2 / 3",
    },
  },
  elem1: {
    color: "rgba(255,255,255,0.5)",
    gridColumn: "1 / 1",
    gridRow: "1 / 1",
  },
  elem2: {
    color: "white",
    gridColumn: "1 / 1",
    gridRow: "2 / 2",
  },
  icon: {
    color: "rgba(255,255,255,0.5)",
    gridColumn: "2 / 2",
    gridRow: "1 / span 2",
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
  const subEarnings = useSelector((state) => state.earnings.subEarnings);

  // Functions
  const getTotalSubEarnings = () => {
    let result = 0;
    if (!isEmpty(subEarnings)) {
      for (let earning of subEarnings) {
        result += earning.amount;
      }
    }
    return Math.round(result * 100) / 100;
  };

  //useEffect

  useEffect(() => {
    setTotal(getTotalSubEarnings());
  }, [subEarnings]);

  return (
    <div className={classes.mainContainer}>
      <h5 className={classes.elem1}>Total Earnings </h5>
      <WalletNewEarnings />
      <h2>{!isEmpty(total) && total}</h2>
    </div>
  );
}

export default WalletTotalEarnings;
