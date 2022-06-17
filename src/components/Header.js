import React from "react";
import airbnbLogo from "../images/airbnb-logo.png"
import OauthLogin from "../service/OauthLogin";

export default function Header() {
    return (
        <nav>
            <img src={airbnbLogo} className="header--logo"/>

            <h1 className="login"><OauthLogin>Log In</OauthLogin></h1>
        </nav>
    )
}