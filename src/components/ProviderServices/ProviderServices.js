import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getServices } from "../../lib/api";
import DetailsContext from "../../store/details-context";
import ServiceList from "../ServiceList/ServiceList";
import ServiceDetailsTile from "../ServiceDetailsTile/ServiceDetailsTile";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import classes from "./ProviderServices.module.css";

const ProviderServices = (props) => {
  const location = useLocation();
  const detailsContext = useContext(DetailsContext);
  const queryParams = new URLSearchParams(location.search);
  const providerId = queryParams.get("service_provider_id");
  const { sendRequest, status, data, error } = useHttp(
    getServices.bind(null, providerId)
  );

  useEffect(() => {
    console.log("use effect");
    sendRequest();
  }, []);

  if (error) {
    console.log("error");
    return <p>{error}</p>;
  }

  if (status === "completed") {
    console.log("data >> ", data.rating);
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.content}>
      {status === "completed" && <div><ServiceList serviceInfo={data.services}/></div>}
      {status === "completed" &&  !detailsContext.service && <img className={classes.image} src={data.image}/>}
      {status === "completed" &&  detailsContext.service && <div className={classes.details} ><ServiceDetailsTile service={detailsContext.service}/></div>}
    </div>
  );
};

export default ProviderServices;
