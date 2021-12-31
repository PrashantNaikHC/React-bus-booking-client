import React from "react";
import classes from "./ServiceTile.module.css";

const ServiceTile = ({ service }) => {
  return (
    <div className={classes.card}>
      <div>
        <img className={classes.image} src={service.image} />
      </div>
      <div className={classes.list}>
        <h4>
          {service.from} - {service.to}
        </h4>
        <p>Type : {service.type}</p>
        <p>Fare : {service.Fare} + Taxes</p>
        <div className={classes.row}>
          <p>Seats Available : {service.available_seats}</p>
          <button>Book</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTile;
