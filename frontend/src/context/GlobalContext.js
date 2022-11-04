import React, { useEffect, useState, createContext } from "react"

export const GlobalContext = createContext([]);

export const GlobalProvider = (props) => {
    
    useEffect(()=>{

    },[])
    return (
        <GlobalContext.Provider value={{}}>
            {props.children}
        </GlobalContext.Provider>
    )
}