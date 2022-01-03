import React, { useContext } from "react";
import DetailsContext from "../../store/details-context";
import Button from "../UI/Button/Button";
import classes from "./ServiceTile.module.css";

const ServiceTile = ({ service }) => {
  const detailsContext = useContext(DetailsContext);
  const clickHandler = () => {
    detailsContext.setService(service);
  };

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
          <Button onClick={clickHandler}>Book</Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTile;
