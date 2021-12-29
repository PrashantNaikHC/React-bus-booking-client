import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Bus Services</div>
    </header>
  );
};

export default NavBar;
