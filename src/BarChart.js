import React, { useEffect, useState, useRef } from "react";

import { Line, Bar } from "react-chartjs-2";
import Loader from "./Loader";
import { useSelector } from "react-redux";

import styles from "./BarChart.module.css";

import { makeStyles } from "@material-ui/core";
import classes from "./BarChart.module.css";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  chart: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    marginBottom: 20,
    alignSelf: "start",
    justifySelf: "start",
  },
}));

function BarChart() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // useRef
  const ExpenseChartRef = useRef(null);

  // Selector
  let subExpenses = useSelector((state) => state.expenses.subExpenses);

  const consolidateData = (arr) => {
    let consolidated_arr = [];
    let tempObj = {};

    arr.forEach((expense) => {
      if (tempObj[expense.date]) {
        tempObj[expense.date.toString()] += expense.amount;
      } else {
        tempObj[expense.date.toString()] = expense.amount;
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
    let copy_arr = subExpenses.slice();
    copy_arr = copy_arr.sort((a, b) => b.date - a.date);

    const chartData = consolidateData(copy_arr);

    setData({
      datasets: [
        {
          label: "Expenses",
          data: chartData,
          backgroundColor: blue[200],
          borderColor: blue[700],
          pointBorderColor: blue[700],
          borderWidth: 1,
        },
      ],
    });

    setOptions({
      maintainAspectRatio: false,
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
      responsive: true,
      maintainAspectRatio: false,
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
      <h1 className={classes.title}>Daily Chart</h1>
      <div className={styles.chart}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
  // return <div ref={ExpenseChartRef} id="chart"></div>;
}

export default BarChart;
