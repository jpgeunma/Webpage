import { useContext } from "react";
import userDispatch from "../components/login/LoginResult";

const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
const API_BASE_URL = 'http://localhost:8080';
const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google'
const LOGOUT_URL = API_BASE_URL + "/logout";

export default function OauthLogin(props) {
  
    const userName = useContext(userDispatch);

    console.log(userName);

    return (
      <div>
        <a
        className="login-link"
        href={ userName === 0 ? GOOGLE_AUTH_URL  :  GOOGLE_AUTH_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {userName === 0 ? <b>Log In</b> : <b>{userName} Log Out</b>}
      </a>

      </div>

    );
}