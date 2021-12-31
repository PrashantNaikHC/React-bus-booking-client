import React, { useState } from 'react';

const DetailsContext = React.createContext({
    showDetails: false,
    setShowDetails: (state) =>{}
})

export const DetailsContextprovider = (props) => {
    const [detailsShowing, setDetailsShowing] = useState(false);
    const setDetails = (state) => {
        setDetailsShowing(state)
    }

    const contextValue = {
        showDetails: detailsShowing,
        setShowDetails: setDetails
    }

    return <DetailsContext.Provider value={contextValue}>
        {props.children}
    </DetailsContext.Provider>
}

export default DetailsContext;