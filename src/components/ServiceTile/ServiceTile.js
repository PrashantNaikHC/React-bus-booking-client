import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import DetailsContext from "../../store/details-context";
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
        <strong>
          {service.from} - {service.to}
        </strong>
        <div>Type : {service.type}</div>
        <div>Fare : {service.Fare} + Taxes</div>
        <div className={classes.row}>
          <Typography variant="caption" display="block" gutterBottom>
            Seats Available : {service.available_seats}
          </Typography>
          <Button variant="contained" size="small" onClick={clickHandler}>
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTile;
