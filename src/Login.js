// import core functions
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

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
    borderRadius: 25,
    marginTop: 30,
    "&:hover": {
      backgroundColor: lightBlue[800],
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
}));

function Login() {
  // Declare core functions
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  const [displayDescriptionBar, setDisplayDescriptionBar] = useState(true);

  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [toolDescription, setToolDescription] = useState();
  const [toolSelected, setToolSelected] = useState(false);

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
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  return (
    <div className={styles.login}>
      <div className={styles.carroussel__container}></div>
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
        {/* <img className={styles.logo2} src={HsLightBlue} alt="Hs" /> */}
        <h2>LOG IN</h2>
        <TextField
          className={`${classes.large} ${classes.space}`}
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className={`${classes.large} ${classes.space}`}
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

        <Button className={`${classes.loginButton} ${classes.space}`}>
          LOGIN
        </Button>
        <p className={styles.newAccount}>
          Don't have an account?{" "}
          <Link className={classes.newAccountButton} to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
