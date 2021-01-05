import React, { useEffect, useState, useRef } from "react";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import Loader from "./Loader";
import { useSelector } from "react-redux";

import styles from "./PieChart.module.css";

import { makeStyles } from "@material-ui/core";
import classes from "./PieChart.module.css";
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
} from "@material-ui/core/colors";
import { relativeTimeRounding } from "moment";

const useStyles = makeStyles((theme) => ({
  chart: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  chartsketch: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    marginBottom: 20,
    alignSelf: "start",
    justifySelf: "start",
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
    <div className={styles.box}>
      <h1 className={classes.title}>Categories</h1>
      <div className={classes.chart}>
        <Doughnut
          data={data}
          options={options}
          className={classes.chartsketch}
        />
      </div>
    </div>
  );
}

export default PieChart;
