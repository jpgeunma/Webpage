import React, {useContext} from "react";
import airbnbLogo from "../images/airbnb-logo.png"
import OauthLogin from "../service/OauthLogin";
import "../style/Header.css"

export default function Header() {


    return (
        <div className="header-wrapper">
            <div className="navigation-top">
                <a href="http://localhost:3000">
                    <img src={airbnbLogo} className="header-logo" />
                </a>
            </div>
            
            <div className="search-box" slot="input">
                <form className="search-form" role="search">
                    <input type="search" className="search-input" placeholder="検索"/> 
                    <button></button>              
                </form>
            </div>
            <div className="user-box">
                <h3 className="login">
                    <OauthLogin/>
                    <a href="http://localhost:3000/board/write">
                        글쓰기
                    </a>
                </h3>
            </div>
        </div>
    )
}