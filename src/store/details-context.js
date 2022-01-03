import React, { useState } from "react";

const DetailsContext = React.createContext({
  service: null,
  setService: (service) => {},
});

export const DetailsContextprovider = (props) => {
  const [service, setService] = useState(null);
  const setServiceMethod = (service) => {
    setService(service);
  };

  const contextValue = {
    service: service,
    setService: setServiceMethod,
  };

  return (
    <DetailsContext.Provider value={contextValue}>
      {props.children}
    </DetailsContext.Provider>
  );
};

export default DetailsContext;
