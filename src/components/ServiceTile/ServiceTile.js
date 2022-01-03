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
        {service.from} - {service.to}
        <div>Type : {service.type}</div>
        <div>Fare : {service.Fare} + Taxes</div>
        <div className={classes.row}>
          <div>Seats Available : {service.available_seats}</div>
          <Button onClick={clickHandler}>Book</Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTile;
