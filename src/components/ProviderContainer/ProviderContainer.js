import React from "react";
import ServiceProviderTile from "../ServiceProviderTile/ServiceProviderTile";
import classes from "./ProviderContainer.module.css";

const ProviderContainer = (props) => {
  return (
    <div className={classes.container}>
      <ServiceProviderTile />
      <ServiceProviderTile />
      <ServiceProviderTile />
    </div>
  );
};

export default ProviderContainer;
