import React, {useContext, userContext, useState } from "react";

const defaultStatus = false;


const LoaderContext = React.createContext(
    
);

export const LoaderProvider = (children) => {
    const [loading, setLoading] = useState(defaultStatus);
    return (
        <LoaderContext.Provider value={{loading, setLoading}}>
            {children}
        </LoaderContext.Provider>
    )

};

export const useLoaderContext = () => useContext(LoaderContext);