import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
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
} from "@material-ui/core/colors";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarIcon: {
    color: "white",
    fontSize: 30,
    "&:focus": {
      color: deepOrange[500],
    },
  },
  color1: {
    backgroundColor: teal[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: teal[500],
    },
  },
  color2: {
    backgroundColor: blue[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: blue[500],
    },
  },
  color3: {
    backgroundColor: cyan[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: cyan[500],
    },
  },
  color4: {
    backgroundColor: amber[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: amber[500],
    },
  },
  color5: {
    backgroundColor: grey[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: grey[500],
    },
  },
  color6: {
    backgroundColor: deepOrange[600],
    margin: 2,
    height: 40,
    width: 40,
    "&:hover": {
      // border: "2px solid lightgrey",
      backgroundColor: deepOrange[500],
    },
  },
  menuList: {
    display: "flex",
    flexWrap: "wrap",
    width: 152,
    padding: 10,
  },
}));

export default function MenuTheme() {
  const colorPalette = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef(null);

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <ColorLensIcon className={classes.appBarIcon} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menuList}
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {colorPalette.map((colorNum) => (
                    <MenuItem
                      onClick={handleClose}
                      className={classes["color" + colorNum]}
                    />
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
