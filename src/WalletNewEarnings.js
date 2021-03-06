import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosExpenses from "./apis/axiosExpenses";
import {
  setExpenses,
  switchReload,
  changeAlertAdd,
} from "./features/expensesSlice";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "is-empty";
import moment from "moment";

import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import {
  teal,
  grey,
  deepOrange,
  indigo,
  deepPurple,
} from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { IconFlagUS, IconFlagEU, IconFlagUK } from "material-ui-flags";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  newEarningsButton: {
    gridColumn: "2 / 2",
    gridRow: "1 / 3",
    color: "white",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal[700],
    boxShadow: "0 0 10px 0 rgba(150, 150, 150, 0.3)",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "bold",
    borderRadius: "4px",
    padding: 10,
    "&:hover": {
      backgroundColor: teal[200],
    },
    "&:focus": {
      outline: "none",
    },
  },
  newEarningsIcon: {
    marginRight: theme.spacing(1),
    color: "rgba(255,255,255,0.8)",
    height: 32,
    width: 32,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 50,
    width: 500,
    borderRadius: 6,
  },
  space: {
    height: 50,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal[500],
    color: "white",
    justifySelf: "end",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: teal[800],
    },
  },
  submitButtonDisabled: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: grey[300],
    color: "white",
    justifySelf: "end",
    borderRadius: "4px",
  },
  cancelButton: {
    color: grey[500],
    justifySelf: "end",
    borderRadius: "4px",
    "&:hover": {
      color: grey[800],
    },
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  addCategoryButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    color: "white",
    backgroundColor: deepOrange[500],
    height: "auto",
    "&:hover": {
      backgroundColor: deepOrange[300],
    },
  },
  rowBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  alignRight: {
    justifySelf: "flex-end",
    alignSelf: "flex-end",
  },
  alignLeft: {
    justifySelf: "flex-start",
    alignSelf: "flex-start",
  },
  categoryContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
  },
  category: {
    backgroundColor: indigo[300],
    padding: 4,
    color: "white",
    borderRadius: 4,
    margin: 4,
  },
  title: {
    color: teal[500],
  },
}));

function WalletNewEarnings() {
  const classes = useStyles();

  const listCurrencies = [
    { value: "EUR", flag: <IconFlagEU /> },
    { value: "USD", flag: <IconFlagUS /> },
    { value: "GBP", flag: <IconFlagUK /> },
  ];

  const typeList = ["Cash", "Cheque", "Bank Transfer"];
  const bankList = [
    "Cash",
    "Revolut",
    "Caisse Epargne",
    "BNP Paribas",
    "Societe Generale",
    "HSBC",
    "Credit agricole",
    "Boursorama",
    "Other",
  ];

  // useState
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [categoryList, setCategoryList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState();
  const [type, setType] = useState();
  const [sourceType, setSourceType] = useState();
  const [disableButton, setDisableButton] = useState(true);

  //useSelector
  const userId = useSelector((state) => state.user.userId);

  // useDispatch
  const dispatch = useDispatch();

  const handleOpen = () => {
    setDate(moment().format("YYYY-MM-DD"));
    setOpen(true);
  };
  const handleClose = () => {
    // Reinitialise the state
    setFrom();
    setDate();
    setAmount();
    setCurrency("");
    setType();
    setSourceType();
    setOpen(false);
    setDisableButton(true);
  };

  const addNewEarnings = async (e) => {
    e.preventDefault();
    // create new Expense
    let newExpense = {};
    newExpense.userId = userId;
    newExpense.type = type;
    newExpense.source_type = sourceType;
    newExpense.date = parseInt(Date.parse(date));
    newExpense.name = from;
    newExpense.amount = parseInt(amount);
    newExpense.currency = currency;
    console.log(newExpense);

    // Push to Database
    const response = await axiosExpenses.post("/earning", newExpense);

    // Close the modal
    if (response.status === 200) {
      dispatch(switchReload());
      dispatch(changeAlertAdd("success"));
    } else {
      dispatch(changeAlertAdd("error"));
    }

    handleClose();
  };

  useEffect(() => {
    if (
      !isEmpty(from) &&
      !isEmpty(date) &&
      !isEmpty(amount) &&
      !isEmpty(currency)
    ) {
      setDisableButton(false);
    }
  }, [from, date, amount, currency]);

  return (
    <React.Fragment>
      <Button className={classes.newEarningsButton} onClick={handleOpen}>
        <AddCircleIcon className={classes.newEarningsIcon} />
        NEW EARNINGS
      </Button>
      <Modal
        aria-labelledby="Modal-create-new-expense"
        aria-describedby="Modal-create-new-expense"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.title}>New Earnings</h2>
            <form className={classes.form}>
              <TextField
                required
                multiline
                className={classes.textField}
                type="text"
                label="From"
                onChange={(e) => setFrom(e.target.value)}
              />
              <TextField
                required
                className={classes.textField}
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                type="number"
                label="Amount"
                className={classes.textField}
                onChange={(e) => setAmount(e.target.value)}
              />
              <TextField
                required
                select
                type="text"
                label="Currency"
                value={currency ? currency : ""}
                className={classes.textField}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {listCurrencies.map((currency) => (
                  <MenuItem key={uuidv4()} value={currency.value}>
                    {currency.flag} {currency.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                type="text"
                label="Type"
                value={type ? type : ""}
                className={classes.textField}
                onChange={(e) => setType(e.target.value)}
              >
                {typeList.map((type) => (
                  <MenuItem key={uuidv4()} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                type="text"
                label="Bank"
                value={sourceType ? sourceType : ""}
                className={classes.textField}
                onChange={(e) => setSourceType(e.target.value)}
              >
                {bankList.map((sourceType) => (
                  <MenuItem key={uuidv4()} value={sourceType}>
                    {sourceType}
                  </MenuItem>
                ))}
              </TextField>
              <div className={classes.space} />
              <div className={`${classes.rowBox} ${classes.alignRight}`}>
                <Button
                  className={`${classes.cancelButton} ${classes.alignRight}`}
                  onClick={(e) => handleClose(e)}
                >
                  CANCEL
                </Button>
                <Button
                  disabled={disableButton}
                  className={`${
                    disableButton
                      ? classes.submitButtonDisabled
                      : classes.submitButton
                  } ${classes.alignRight}`}
                  type="submit"
                  onClick={(e) => addNewEarnings(e)}
                >
                  <AddIcon className={classes.newEarningsIcon} />
                  ADD NEW EARNINGS
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default WalletNewEarnings;
