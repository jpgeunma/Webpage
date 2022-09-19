import React, { useState, useEffect } from "react";
import loginstyle from "./../../style/Login.css";
import basestyle from "./../../style/Login.css";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cookies = new Cookies();


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// const Login = () => {
//   const navigate = useNavigate();
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [user, setUserDetails] = useState({
//     email: "",
//     password: "",
//   });



//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(user);
//       axios.post("http://localhost:8080/auth/authenticate", user).then((res) => {
//         alert("login Success");
//         console.log(res.data.token);
//         cookies.set("token", res.data.token);
//         cookies.set("email", user.email);
//         navigate('/', { replace: true });
//       });
//     }
//   }, [formErrors]);
//   return (
//     <div className={loginstyle.login}>
//       <form>
//         <h1>Login</h1>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email"
//           onChange={changeHandler}
//           value={user.email}
//         />
//         <p className={basestyle.error}>{formErrors.email}</p>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           onChange={changeHandler}
//           value={user.password}
//         />
//         <p className={basestyle.error}>{formErrors.password}</p>
//         <button className={basestyle.button_common} onClick={loginHandler}>
//           Login
//         </button>
//       </form>
//       <NavLink to="/login/register">Not yet registered? Register Now</NavLink>
//     </div>
//   );
// };
// export default Login;


const theme = createTheme();

export default function SignIn() {

   const navigate = useNavigate();

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(!validateForm(data))
      window.alert("invalidate form");
    else{
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      const user = {
        email: data.get('email'),
        password: data.get('password'),
      }
      axios.post("http://localhost:8080/auth/authenticate", user).then((res) => {
        alert("login Success");
        console.log(res.data.token);
        cookies.set("token", res.data.token);
        cookies.set("email", data.get('email'));
        navigate('/', { replace: true });
      }).catch((res) => {
        console.log("Login failed ", res);
        alert("login Failed");
      });
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}