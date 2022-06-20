import React, {useContext} from "react";
import airbnbLogo from "../images/airbnb-logo.png"
import OauthLogin from "../service/OauthLogin";
import "../style/Header.css"

export default function Header() {


    return (
        <div className="header-wrapper">
            <a href="http://localhost:3000">
                <img src={airbnbLogo} className="header-logo" />
            </a>
                

            <h1 className="login">
                <OauthLogin/>
                <a href="http://localhost:3000/board/write">
                    글쓰기
                </a>
            </h1>
        </div>
    )
}