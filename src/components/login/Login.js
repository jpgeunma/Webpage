import googleLogo from "../../images/google-logo.png"
export default function Login(props) {
    const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
    const API_BASE_URL = 'http://localhost:8080';
    const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;


    return (
        <div className="login-container">
        <div className="login-content">
            <h1 className="login-title">Login to SpringSocial</h1>
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
            </div>
            <div className="or-separator">
                <span className="or-text">OR</span>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>            
            <span className="signup-link">New user? <a href="/signup">Sign up!</a></span>
        </div>
        </div>         
    )
}

function SocialLogin() {

}

function LoginForm() {
    
}