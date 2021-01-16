import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import { useHistory } from "react-router-dom";

// Import for Material UI / Styling
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import {
  teal,
  blue,
  cyan,
  amber,
  grey,
  deepOrange,
  pink,
} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles((theme) => ({
  appBarIcon: {
    color: "white",
    fontSize: 30,
    "&:focus": {
      color: deepOrange[500],
    },
    [theme.breakpoints.down(460)]: {
      fontSize: 24,
    },
  },
  gridElement: {
    gridColumnStart: 3,
    "&:focus": { outline: "none" },
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  menuItem: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: 10,
  },
  userInfo: {
    textAlign: "center",
    justifyContent: "center",
    margin: 0,
  },
  disconnectButton: {
    fontSize: 10,
    "&:hover": {
      backgroundColor: pink[50],
      color: pink[500],
    },
    "&:focus": {
      outline: "none",
      color: pink[500],
    },
  },
}));

export default function MenuUser() {
  const colorPalette = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const signOut = (e) => {
    e.preventDefault();

    const credentials = {
      userId: "",
      firstname: "",
      lastname: "",
      email: "",
    };
    dispatch(setUser(credentials));
    history.push("/Expenses/");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      {/* <IconButton
        className={classes.gridElement}
        size="small"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <ColorLensIcon className={classes.appBarIcon} />
      </IconButton> */}
      <IconButton
        size="small"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        className={classes.gridElement}
        onClick={handleToggle}
      >
        {/* <Badge badgeContent="" color="secondary"> */}
        <AccountCircleIcon className={classes.appBarIcon} />
        {/* </Badge> */}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              className={classes.menuList}
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <p className={`${classes.menuItem} ${classes.userInfo}`}>
                {user.firstname} {user.lastname}
              </p>
              <MenuItem
                className={`${classes.menuItem} ${classes.disconnectButton}`}
                onClick={(e) => signOut(e)}
              >
                <PowerSettingsNewIcon />
                DISCONNECT
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </React.Fragment>
  );
}
