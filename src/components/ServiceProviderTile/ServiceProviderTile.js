import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ServiceProviderTile.module.css";

const ServiceProviderTile = ({ title, id, rating, image }) => {
  return (
    <NavLink to="/" style={{ textDecoration: "none" }}>
      <section className={classes.content}>
        <img className={classes.image} src={image}></img>
        <h2>{title}</h2>
        <div className={classes.rating}> rating {rating}</div>
      </section>
    </NavLink>
  );
};

export default ServiceProviderTile;
