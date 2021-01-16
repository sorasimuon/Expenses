// import core functions
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import isEmpty from "is-empty";
import axios from "./apis/axiosUsers";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";

// Import for Styling and Material-UI
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { lightBlue } from "@material-ui/core/colors";
import walletLogo from "./img/wallet.png";
import messengerLogo from "./img/messenger.png";
import HsWhite from "./img/Hs-White.png";
import Slide from "@material-ui/core/Slide";
import ErrorIcon from "@material-ui/icons/Error";
import CircularProgress from "@material-ui/core/CircularProgress";

// Declre styles to override default component styling
const useStyles = makeStyles((theme) => ({
  large: {
    width: "100%",
  },

  space: {
    marginBottom: 20,
  },
  loginButton: {
    color: "white",
    backgroundColor: lightBlue[600],
    width: "100%",
    height: 50,
    borderRadius: 4,
    marginTop: 30,
    "&:hover": {
      backgroundColor: lightBlue[800],
    },
    [theme.breakpoints.down(420)]: {
      height: 32,
    },
  },
  newAccountButton: {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: lightBlue[600],
    textDecoration: "none",
    "&:hover": {
      color: lightBlue[800],
      textDecoration: "none",
      cursor: "pointer",
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
    color: lightBlue[300],
    outline: "none",
    [theme.breakpoints.down(380)]: {
      fontSize: 10,
    },
    "&$focused": {
      color: lightBlue[300],
      borderBottomColor: lightBlue[300],
    },
  },
  focused: {},
}));

function Login() {
  // Declare core functions
  const classes = useStyles();
  const classesTextField = useStylesTextField();

  const dispatch = useDispatch();

  const [width, setWidth] = useState(window.innerWidth);
  const [displayDescriptionBar, setDisplayDescriptionBar] = useState(true);

  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [toolDescription, setToolDescription] = useState();
  const [toolSelected, setToolSelected] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [disabledSignIn, setDisableSignIn] = useState(false);
  const history = useHistory();

  const userId = useSelector((state) => state.user.userId);

  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const signIn = async (e) => {
    e.preventDefault();
    const validInput = checkValidityInput();
    setDisableSignIn(true);

    try {
      if (validInput) {
        const credentials = {
          email: email,
          password: password,
        };

        const response = await axios.post("/signin", credentials);
        if (!response.error) {
          console.log("connected");
          dispatch(setUser(response.data));
          history.push("/Expenses/wallet");
        } else {
          console.log(response.error);
        }
      }
    } catch (error) {
      if (error.toString() == "Error: Network Error") {
        setErrorMessages(["Error connection to server"]);
      } else {
        setErrorMessages([error.response]);
      }
    } finally {
      setDisableSignIn(false);
    }
  };

  const handleToolMouseOver = (id) => {
    switch (id) {
      case "wallet":
        setToolDescription(
          "With Happy Wallet, you can record your expenses and have a better control on your money"
        );
        setToolSelected(true);
        break;
      case "messenger":
        setToolDescription(
          "With Happy Messenger, communicate with your friends on a private chat"
        );
        setToolSelected(true);
        break;
      default:
        break;
    }
  };
  const handleToolMouseOut = (id) => {
    setToolDescription("");
    setToolSelected(false);
  };

  const checkValidityInput = () => {
    const messages = [];

    if (isEmpty(email)) {
      messages.push("Email is empty");
    } else if (!email.match(mailFormat)) {
      messages.push("Email wrong format");
    }
    if (isEmpty(password)) {
      messages.push("Password  is empty");
    }

    setErrorMessages(messages);

    if (isEmpty(messages)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const updateWidth = () => {
      if (isMounted) {
        setWidth(window.innerWidth);
      }
    };

    window.addEventListener("resize", updateWidth);
    console.log(isMounted);
    return () => {
      isMounted = false;

      window.removeEventListener("resize", updateWidth);
      console.log(isMounted);
    };
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.carroussel__container} />
      {width >= 960 ? (
        <div className={styles.carroussel__wrapper}>
          <h1 className={styles.title}>
            <span className={styles.capital}>H</span>appy{" "}
            <span className={styles.capital}>s</span>uite
          </h1>
          <p className={styles.textDescription}>
            With Happy Suite, create a private space with your friends and your
            family to share personal infomation with the Happy Suite tools
          </p>

          {/* Series of functionality icons */}
          <div className={styles.toolContainer}>
            <img
              id="wallet"
              className={styles.tool}
              src={walletLogo}
              alt="wallet"
              onMouseOver={(e) => handleToolMouseOver(e.target.id)}
              onMouseOut={(e) => handleToolMouseOut(e.target.id)}
            />
            <img
              id="messenger"
              className={styles.tool}
              src={messengerLogo}
              alt="messenger"
              onMouseOver={(e) => handleToolMouseOver(e.target.id)}
              onMouseOut={(e) => handleToolMouseOut(e.target.id)}
            />
          </div>
          <Slide direction="right" in={toolSelected} mountOnEnter unmountOnExit>
            <p className={styles.functionDescription}>{toolDescription}</p>
          </Slide>
        </div>
      ) : (
        ""
      )}

      <form className={styles.login__container}>
        <img
          src={HsWhite}
          className={`${styles.logo1} ${classes.space}`}
          alt="Hs logo"
        />
        <h1 className={styles.subject}>LOG IN</h1>

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
          fullWidth
          className={`${classes.textField} ${classes.space}`}
          label="Email"
          type="text"
          // value={email || ""}
          inputProps={{ value: email || "" }}
          InputLabelProps={{
            classes: classesTextField,
          }}
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
          // value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            value: password || "",
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

        <Button
          disabled={disabledSignIn}
          className={`${classes.loginButton} ${classes.space}`}
          onClick={(e) => signIn(e)}
        >
          LOGIN
          {disabledSignIn && <CircularProgress style={{ color: "white" }} />}
        </Button>
        <p className={styles.newAccount}>
          Don't have an account?{" "}
          <Link className={classes.newAccountButton} to="/Expenses/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
