import React, { useEffect, useState, useRef } from "react";

import { Bar, Line } from "react-chartjs-2";
import Loader from "./Loader";
import { useSelector } from "react-redux";

import styles from "./BarChart.module.css";

import { makeStyles } from "@material-ui/core";
import classes from "./BarChart.module.css";
import { blue, deepOrange, teal } from "@material-ui/core/colors";
import { relativeTimeRounding } from "moment";
import { ImportantDevices } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "grid",
    gridTemplateColumns: "1fr [col1]",
    gridTemplateRows: "48px [row1] 1fr [row2]",
    boxShadow: "0 0 20px 0 rgba(50, 50, 50, 0.7)",
    borderRadius: 4,
    padding: 30,
    backgroundColor: blue[200],
    [theme.breakpoints.between(601, 800)]: {
      gridColumn: "1 / 3",
      gridRow: "2 / 3",
    },
    [theme.breakpoints.down(600)]: {
      gridColumn: "1 / 3",
      gridRow: "3 / 4",
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
    gridRow: "2 / 3",
    width: "100%",
    height: "auto",
    maxHeight: "400px",
    [theme.breakpoints.down(800)]: {
      width: "100%",
      height: "auto",
      maxHeight: "312px",
    },
  },
}));

function BarChart() {
  const classes = useStyles();
  const [data, setData] = useState();
  // const [options, setOptions] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // useRef
  const ExpenseChartRef = useRef(null);

  // Selector
  const subExpenses = useSelector((state) => state.expenses.subExpenses);
  const subEarnings = useSelector((state) => state.earnings.subEarnings);
  //Define Options
  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 10,
            fontColor: "white",
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255,.3)",
          },
          scaleLabel: {
            display: true,
            labelString: "Amount per day",
            fontColor: "rgb(255,255,255)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(255,255,255,.3)",
          },
          type: "time",
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            fontColor: "white",
          },
          time: {
            displayFormats: {
              day: "MMM D",
            },
            unit: "day",
          },
          scaleLabel: {
            display: true,
            labelString: "Date",
            fontColor: "rgb(255,255,255)",
          },
          distribution: "linear",
        },
      ],
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "white",
        fontSize: 16,
      },
    },
  });

  // Functions
  const consolidateData = (arr) => {
    let consolidated_arr = [];
    let tempObj = {};

    arr.forEach((obj) => {
      if (tempObj[obj.date]) {
        tempObj[obj.date.toString()] += obj.amount;
      } else {
        tempObj[obj.date.toString()] = obj.amount;
      }
    });

    for (const [key, value] of Object.entries(tempObj)) {
      // let date = new Date(parseInt(key));
      let date = parseInt(key);
      consolidated_arr.push({ x: date, y: value });
    }
    consolidated_arr = consolidated_arr.sort((a, b) => a.x - b.x);
    return consolidated_arr;
  };

  useEffect(() => {
    let copy_subExpenses = subExpenses.slice();
    copy_subExpenses = copy_subExpenses.sort((a, b) => b.date - a.date);
    const dataExpenses = consolidateData(copy_subExpenses);

    let copy_subEarnings = subEarnings.slice();
    copy_subEarnings = copy_subEarnings.sort((a, b) => b.date - a.date);
    const dataEarnings = consolidateData(copy_subEarnings);

    setData({
      datasets: [
        {
          label: "Earnings",
          data: dataEarnings,
          backgroundColor: teal[300],
          borderColor: teal[700],
          pointBorderColor: teal[700],
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: dataExpenses,
          backgroundColor: deepOrange[200],
          borderColor: deepOrange[700],
          pointBorderColor: deepOrange[700],
          borderWidth: 1,
        },
      ],
    });

    setIsLoading(false);
  }, [subExpenses]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.box}>
      <h1 className={classes.title}>Daily Chart</h1>
      <div className={classes.canvasContainer}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default BarChart;
