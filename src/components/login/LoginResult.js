import { useLocation } from "react-router";
import React from "react";


export default function LoginResult() {

    const location = useLocation();


    const getUrlParameterANdSave = (key) => {
        const value = new URLSearchParams(location.search).get(key);
        localStorage.setItem(key, value);
        return value;
    }


    const token = getUrlParameterANdSave("token");
    const email = getUrlParameterANdSave("email");
    const user = getUrlParameterANdSave("user");
    const hearTemp = getUrlParameterANdSave("heartTemp");


    return (

        <div>
            <h1>Login Success!</h1>
            <h1>{token}</h1>
        </div>
    )
}

