
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
const API_BASE_URL = 'http://localhost:8080';
const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google'
const LOGOUT_URL = API_BASE_URL + "/logout";
const LOGIN_LINK = "http://localhost:3000/login"

export default function OauthLogin(props) {
  
    const userName = "";

    return (
      <div>
        <a
        className="login-link"
        href={ userName === 0 ? LOGIN_LINK  :  LOGOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {userName === 0 ? <b>Log In</b> : <b>{userName} Log Out</b>}
      </a>
      <a
        href={ LOGIN_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        /Login link
      </a>
      </div>

    );
}