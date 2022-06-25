import { useLocation } from "react-router";
import { Cookies } from "react-cookie";
import React from "react";


export default function LoginResult() {

    const location = useLocation();

    const cookies = new Cookies();

    const getUrlParameterAndSave = (key) => {
        const value = new URLSearchParams(location.search).get(key);
        cookies.set(key, value);
        return value;
    }


    const token = getUrlParameterAndSave("token");
    const email = getUrlParameterAndSave("email");
    const user = getUrlParameterAndSave("user");
    const hearTemp = getUrlParameterAndSave("heartTemp");


    return (

        <div>
            <h1>Login Success!</h1>
            <h1>{token}</h1>
            <h1>{email}</h1>
            <h1>{user}</h1>
            <h1>{hearTemp}</h1>
            
        </div>
    )
}

