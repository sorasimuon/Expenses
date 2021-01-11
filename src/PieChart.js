import React, { useEffect, useState, useRef } from "react";

import { Doughnut } from "react-chartjs-2";
import Loader from "./Loader";
import { useSelector } from "react-redux";

import styles from "./PieChart.module.css";
import { makeStyles } from "@material-ui/core";
import {
  red,
  deepPurple,
  indigo,
  cyan,
  teal,
  green,
  lime,
  yellow,
  deepOrange,
  blue,
} from "@material-ui/core/colors";
import { relativeTimeRounding } from "moment";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // box: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "flex-start",
  //   alignItems: "flex-start",
  //   boxShadow: "0 0 20px 0 rgba(50, 50, 50, 0.7)",
  //   borderRadius: 4,
  //   padding: 30,
  //   backgroundColor: indigo[300],
  //   alignSelf: "stretch !important",
  // },
  // title: {
  //   color: "white",
  //   marginBottom: 20,
  // },
  // canvasContainer: {
  //   position: "relative",
  //   width: "80% !important",
  //   height: "80% !important",
  //   margin: "auto",
  // },

  box: {
    display: "grid",
    gridTemplateColumns: "1fr [col1]",
    gridTemplateRows: "48px [row1] 1fr [row2]",
    boxShadow: "0 0 20px 0 rgba(100, 100, 100, 0.7)",
    borderRadius: 4,
    padding: 30,
    backgroundColor: deepPurple[200],
    [theme.breakpoints.between(601, 800)]: {
      gridColumn: "1 / 3",
      gridRow: "3 / 4",
    },
    [theme.breakpoints.down(600)]: {
      gridColumn: "1 / 3",
      gridRow: "4 / 5",
    },
  },
  title: {
    gridColumn: "1 / 1",
    gridrow: "1 / 1",
    color: "white",
    marginBottom: 20,
  },
  canvasContainer: {
    position: "relative",
    gridColumn: "1 / 1",
    gridrow: "2 / 2",
    width: "100% !important",
    margin: "auto",
  },
}));

function PieChart() {
  // List of colors
  const colorList = [
    { bcg: red[300], border: red[700] },
    { bcg: deepPurple[300], border: deepPurple[700] },
    { bcg: indigo[300], border: indigo[700] },
    { bcg: cyan[300], border: cyan[700] },
    { bcg: teal[300], border: teal[700] },
    { bcg: green[300], border: green[700] },
    { bcg: lime[300], border: lime[700] },
    { bcg: yellow[300], border: yellow[700] },
    { bcg: deepOrange[300], border: deepOrange[700] },
  ];
  const classes = useStyles();
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useRef
  const ExpenseChartRef = useRef(null);

  // Selector
  let subExpenses = useSelector((state) => state.expenses.subExpenses);

  const consolidateData = (arr) => {
    let tempObj = {};
    let labels = [];
    let data = [];

    arr.forEach((expense) => {
      expense.categories.forEach((category) => {
        if (tempObj[category]) {
          tempObj[category] += expense.amount;
        } else {
          tempObj[category] = expense.amount;
        }
      });
    });

    for (const [key, value] of Object.entries(tempObj)) {
      labels.push(key);
      data.push(value);
    }
    return { labels: labels, data: data };
  };

  useEffect(() => {
    const { labels, data } = consolidateData(subExpenses);

    // select colors
    const nbColors = labels.length;
    const nbColorsInList = colorList.length;
    const savedColors = [];
    const bcgColors = [];
    const borderColors = [];
    let num = 0;

    for (let i = 0; i < nbColors; i++) {
      do {
        num = Math.round(Math.random() * 100) % nbColorsInList;
      } while (savedColors.includes(num));

      savedColors.push(num);
      bcgColors.push(colorList[num].bcg);
      borderColors.push(colorList[num].border);
    }

    setData({
      datasets: [
        {
          data: data,
          backgroundColor: bcgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
      labels: labels,
    });

    setOptions({
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "white",
          fontSize: 16,
        },
      },
    });

    setIsLoading(false);
  }, [subExpenses]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.box}>
      <h1 className={classes.title}>Categories</h1>
      <div className={classes.canvasContainer}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
