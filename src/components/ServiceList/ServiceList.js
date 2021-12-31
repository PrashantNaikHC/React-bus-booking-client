import React from "react";
import ServiceTile from "../ServiceTile/ServiceTile";
import classes from "./ServiceList.module.css";

const ServiceList = ({ serviceInfo }) => {
  return (
    <div className={classes.content}>
      <ul>
        {serviceInfo.map((service) => (
          <li>
            <ServiceTile service={service}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
