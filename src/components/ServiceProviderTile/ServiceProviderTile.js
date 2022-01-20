import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ServiceProviderTile.module.css";

const ServiceProviderTile = ({ title, id, rating, image }) => {
  return (
    <NavLink
      to={`/services?service_provider_id=${id}`}
      style={{ textDecoration: "none" }}
    >
      <section className={classes.content}>
        <img className={classes.image} src={image}></img>
        <h2>{title}</h2>
        <div className={classes.rating}>
          <div className={classes.ratingHeader}>Rating</div>
          <p>&nbsp;&nbsp;</p>
          <div className={classes.ratingValue}>{rating}</div>
        </div>
      </section>
    </NavLink>
  );
};

export default ServiceProviderTile;
