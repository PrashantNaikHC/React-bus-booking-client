import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getServiceProviders } from "../../lib/api";
import ServiceProviderTile from "../ServiceProviderTile/ServiceProviderTile";
import classes from "./ProviderContainer.module.css";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import DetailsContext from "../../store/details-context";

const ProviderContainer = (props) => {
  const detailsContext = useContext(DetailsContext);
  const { sendRequest, status, data, error } = useHttp(getServiceProviders);

  useEffect(() => {
    sendRequest();
    detailsContext.setShowDetails(null);
  }, [sendRequest, detailsContext]);

  if (status === "completed") {
    console.log("data", data);
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.container}>
      {status === "completed" &&
        data.data.map((serviceProvider) => (
          <ServiceProviderTile
            title={serviceProvider.name}
            id={serviceProvider.id}
            rating={serviceProvider.rating}
            image={serviceProvider.image}
          />
        ))}
    </div>
  );
};

export default ProviderContainer;
