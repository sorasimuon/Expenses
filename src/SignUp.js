// import core functions
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./SignUp.module.css";
import isEmpty from "is-empty";
import axios from "./apis/axiosUsers";
import { setUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { lightBlue, teal } from "@material-ui/core/colors";
import HsWhite from "./img/Hs-White.png";
import { FilterNone } from "@material-ui/icons";
import ErrorIcon from "@material-ui/icons/Error";

// Declre styles to override default component styling
const useStyles = makeStyles((theme) => ({
  large: {
    width: "100%",
  },
  space: {
    marginBottom: 20,
  },
  signUpButton: {
    color: "white",
    backgroundColor: teal[300],
    width: "100%",
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    "&:hover": {
      backgroundColor: teal[800],
    },
    "&:focus": {
      outline: "none",
    },
  },

  iconButton: {
    width: 80,
    height: 80,
    border: "3px solid #039be5",
    backgroundColor: "white,",
  },
  textField: {
    [theme.breakpoints.down(380)]: {
      height: 28,
    },
  },
  errorIcon: {
    color: "red",
  },
}));

const useStylesTextField = makeStyles((theme) => ({
  root: {
    color: teal[300],
    outline: "none",
    [theme.breakpoints.down(380)]: {
      fontSize: 10,
    },
    "&$focused": {
      color: teal[300],
      borderBottomColor: teal[300],
    },
  },
  focused: {},
}));

function SignUp() {
  // Declare core functions
  let classes = useStyles();
  let classesTextField = useStylesTextField();

  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const signUp = async (e) => {
    e.preventDefault();
    const validInput = checkValidityInput();

    try {
      if (validInput) {
        const credentials = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        };

        const response = await axios.post("/signup", credentials);

        console.log(response);
        if (response.status === 201) {
          console.log(response.data);
          dispatch(setUser(response.data));
          history.push("/Expenses/wallet");
        }
      }
    } catch (error) {
      setErrorMessages([error.response.data]);
    }
  };

  const checkValidityInput = () => {
    const messages = [];

    if (isEmpty(firstname)) {
      messages.push("Firstname is empty");
    }
    if (isEmpty(lastname)) {
      messages.push("Lastname is empty");
    }
    if (isEmpty(email)) {
      messages.push("Email is empty");
    } else if (!email.match(mailFormat)) {
      messages.push("Email wrong format");
    }
    if (isEmpty(password) || isEmpty(password2)) {
      messages.push("Password and/or Confirm Password is empty");
    } else if (password !== password2) {
      messages.push("Error confirming the password");
    }
    setErrorMessages(messages);

    if (isEmpty(messages)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {}, [errorMessages]);

  return (
    <div className={styles.login}>
      {/* <div className={styles.carroussel__container}></div> */}

      <form className={styles.login__container}>
        <Link to="/Expenses/login">
          <img
            src={HsWhite}
            className={`${styles.logo1} ${classes.space}`}
            alt="Hs logo"
          />
        </Link>

        {/* <img className={styles.logo2} src={HsLightBlue} alt="Hs" /> */}
        <h1>SIGN UP</h1>

        {/* Error messages display */}
        <div className={styles.errorMessagesContainer}>
          {!isEmpty(errorMessages) && (
            <p className={styles.errorMesssages}>
              <ErrorIcon className={classes.errorIcon} /> Error
            </p>
          )}
          {!isEmpty(errorMessages) &&
            errorMessages.map((message, id) => (
              <p key={id} className={styles.errorMessages}>
                {message}
              </p>
            ))}
        </div>

        <TextField
          data-testid="inputFirstname"
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          InputLabelProps={{
            classes: classesTextField,
          }}
          label="Firstname"
          type="text"
          inputProps={{ value: firstname }}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          data-testid="inputLastname"
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          InputLabelProps={{
            classes: classesTextField,
          }}
          label="Lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          data-testid="inputEmail"
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          InputLabelProps={{
            classes: classesTextField,
          }}
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          data-testid="inputPassword"
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          InputLabelProps={{
            classes: classesTextField,
          }}
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          data-testid="inputPassword2"
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          InputLabelProps={{
            classes: classesTextField,
          }}
          label="Confirm Password"
          type={showPassword2 ? "text" : "password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          data-testid="buttonSignUp"
          className={`${classes.signUpButton} ${classes.space}`}
          type="submit"
          onClick={(e) => signUp(e)}
        >
          SIGN UP
        </Button>
      </form>
    </div>
  );
}
export default SignUp;
