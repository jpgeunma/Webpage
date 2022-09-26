import { Cookies } from "react-cookie";
import React, { useState, useEffect, useContext } from "react";
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
const API_BASE_URL = 'http://localhost:8080';
const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google'
const LOGOUT_URL = "http://localhost:3000/"
const LOGIN_LINK = "http://localhost:3000/login"

const cookies = new Cookies();

export const IsUserLogined = React.createContext(Boolean);
export default function OauthLogin(props) {
  
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
      if(cookies.get('email') != null)
      {
        setUserName(cookies.get('email'));
      }
    })

    const setLogout = (event) => {
      const {value} = event.target;
      setUserName("ログイン");
      cookies.set('email', "", {path: "/"});
      cookies.set('token', "", {path: "/"});
    }
    
    const setLogin = (event) =>{
      const { value } = event.target;
      setUserName(cookies.get("email"));
    }

    return (
      <div>
          <a
          className="login-link"
          href={ userName.length === 0 ? LOGIN_LINK  :  LOGOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={ userName.length === 0 ? setLogin : setLogout}
        >
          {userName.length === 0 ? <b>ログイン</b> : <b>{userName}</b>}
        </a>
      </div>

    );
}