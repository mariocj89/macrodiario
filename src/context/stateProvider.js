import React from "react";
import useDayState from "../hooks/useDayState";

const StateContext = React.createContext();

export const StateProvider = ({children}) => {
    return <StateContext.Provider value={useDayState()}>{children}</StateContext.Provider>
};

export default StateContext;