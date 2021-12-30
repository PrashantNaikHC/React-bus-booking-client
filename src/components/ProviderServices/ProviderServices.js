import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getServices } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import classes from "./ProviderServices.module.css";

const ProviderServices = (props) => {
  const location = useLocation();
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
      {status === "completed" && <div>{data.rating}</div>}
      {status === "completed" && <img src={data.image}/>}
    </div>
  );
};

export default ProviderServices;
