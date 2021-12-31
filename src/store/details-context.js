import React, { useState } from "react";

const DetailsContext = React.createContext({
  showDetails: null,
  setShowDetails: (service) => {},
});

export const DetailsContextprovider = (props) => {
  const [detailsShowing, setDetailsShowing] = useState(null);
  const setDetails = (service) => {
    setDetailsShowing(service);
  };

  const contextValue = {
    showDetails: detailsShowing,
    setShowDetails: setDetails,
  };

  return (
    <DetailsContext.Provider value={contextValue}>
      {props.children}
    </DetailsContext.Provider>
  );
};

export default DetailsContext;
