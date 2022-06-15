

export default function OauthLogin() {
    return (
        <a
        className="Oauth login link"
        href="http://localhost:8080/oauth2/authorization/google"
        target="_blank"
        rel="noopener noreferrer"
      >
        Log In
      </a>
    );
}