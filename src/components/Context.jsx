import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const Dataprovider = ({ children }) => {
    const [login, setlogin] = useState(localStorage.getItem("username") ? true : false)
    const [user, setuser] = useState(localStorage.getItem("username") ? localStorage.getItem("username") : "")

    const value = {
        login,
        setlogin,
        user,
        setuser
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

const customhook = () => {
    const context = useContext(Context)
    return context
}

export default customhook