import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import Loader from "./Loader";
import moment from "moment";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  grid: {
    overflow: "scroll",
  },
});

function WalletExpenseGrid() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  // selectors Redux
  const subExpenses = useSelector((state) => state.expenses.subExpenses);

  // rows
  const rows = [];
  for (let expense of subExpenses) {
    const temp = {};
    temp.id = expense.id;
    temp.userId = expense.userId;
    let date = new Date(expense.date);
    temp.date = date;
    temp.name = expense.name;
    temp.amount = expense.amount;
    temp.categories = expense.categories;
    temp.currency = expense.currency;
    temp.type = expense.type;
    temp.source_type = expense.source_type;
    rows.push(temp);
  }

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "userId", headerName: "USER ID", width: 300 },
    { field: "date", headerName: "DATE", width: 300 },
    { field: "name", headerName: "NAME", width: 300 },
    { field: "categories", headerName: "CATEGORIES", width: 300 },
    { field: "amount", headerName: "AMOUNT", width: 300 },
    { field: "currency", headerName: "CURRENCY", width: 300 },
    { field: "type", headerName: "TYPE", width: 300 },
    { field: "source_type", headerName: "SOURCE TYPE", width: 300 },
  ];

  if (isLoading) return <Loader />;

  // Fulfill column names

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      checkboxSelection
      className={classes.grid}
    />
  );
}

export default WalletExpenseGrid;