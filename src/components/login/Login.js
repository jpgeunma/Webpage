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
import styled, {css} from "styled-components";
import googleLogo from "../../images/google-logo.png";

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


const theme = createTheme();

export default function SignIn() {

   const navigate = useNavigate();
   const [sent, setSent] = useState(false);

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
        {/* css 컨테이너 */}
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
          <Typography component="h1" variant="h5" sx={{paddingBottom: 2}}>
            Sign in
          </Typography>
          {/* oauth2 로그인*/}
          <LoginSignupContent>
            <BorderAndText>
              <span>간편 로그인/회원가입</span>
            </BorderAndText>

            <VerticalButtons>
              <BarButton
                href="http://3.39.23.145:8080/oauth2/authorization/kakao"
                className="kakao"
              >
                <SpIcon className="Kakaotalk"></SpIcon>
                카카오로 3초만에 시작하기
              </BarButton>
              <BarButton className="email" href="/signupemail">
                이메일로 가입하기
              </BarButton>
            </VerticalButtons>

            <HorizontalButtons>
              <RadiusButton
                href="http://localhost:8080/oauth2/authorization/google"
              >
                <img src={googleLogo} style={{width: 64}} />
              </RadiusButton>

              <RadiusButton className="facebook" href="">
                <SpIcon className="facebook"></SpIcon>
              </RadiusButton>

              <RadiusButton className="twitter" href="">
                <SpIcon className="twitter"></SpIcon>
              </RadiusButton>

              <RadiusButton className="apple" href="">
                <SpIcon className="apple"></SpIcon>
              </RadiusButton>
            </HorizontalButtons>
          </LoginSignupContent>
          {/* 로그인 폼 */}
          <LoginSignupContent>
            <BorderAndText>
              <span>イーメールでログイン</span>
            </BorderAndText>
          </LoginSignupContent>
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
              ログイン
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








const CommonButton = styled.button`
  margin-top: 6px;
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: none;
  background: #f1c333;
  color: #ffffff;
  font-size: 16px;
  line-height: 30px;
  padding: 0 16px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgb(220 220 220 / 30%);
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  vertical-align: middle;
`;

const Bp = styled.input`
  -webkit-appearance: none;
  background: transparent;
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  margin: 0;

  &:before {
    cursor: pointer;
    content: "";
    display: inline-block;
    line-height: 16px;
    width: 16px;
    height: 16px;
    background: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 1px solid #acacac;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
  }
`;

const InputCheckbox = styled.div`
  display: inline-block;
`;

const EmailLoginOption = styled.div`
  padding: 13px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
  font-size: 11px;
`;

const EmailLoginInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  outline: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EmailLoginContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const LoginSigninContent = styled.div``;

const RadiusButton = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 19px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  &.google {
    background: #30c612;
  }

  &.facebook {
    padding-right: 4px;
    background: #3c5b96;
  }

  &.twitter {
    padding-left: 3px;
    background: #51acf1;
  }

  &.apple {
    background: #ffffff;
    border: 1px solid #000000;
  }
`;

const HorizontalButtons = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const BarButton = styled.a`
  display: block;
  width: 100%;
  height: 44px;
  margin-top: 12px;
  text-decoration: none;
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.kakao {
    background: #fee500;
    color: #333333;
  }

  &.email {
    background: #ffffff;
    color: #f1c333;
    border: 1px solid #f1c333;
  }
`;

const VerticalButtons = styled.div`
  width: 100%;
`;

const BorderAndText = styled.div`
  border-top: 1px solid #999999;
  color: #999999;
  display: flex;
  justify-content: center;
  span {
    font-size: 12px;
    margin-top: -8px;
    background: #ffffff;
    text-align: center;
  }
`;

const SpIcon = styled.span`
  background-image: url("https://www.idus.com/resources/dist/images/sp/sp-icon_1634026706070.png");
  height: 0;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  line-height: 0;
  letter-spacing: 0;

  @media (-webkit-min-device-pixel-ratio: 2),
    not all,
    not all,
    (min-resolution: 192dpi) {
    background-image: url(https://www.idus.com/resources/dist/images/sp/sp-icon_1634026706070@2x.png);
    -webkit-background-size: 787px 736px;
    background-size: 787px 736px;
  }

  &.Kakaotalk {
    background-position: -631px -626px;
    width: 32px;
    padding-top: 32px;
  }

  &.google {
    background-position: -689px 0px;
    background-image: {googleLogo};
    width: 32px;
    padding-top: 32px;
  }

  &.facebook {
    background-position: -537px -626px;
    width: 32px;
    padding-top: 32px;
  }

  &.twitter {
    background-position: -689px -94px;
    width: 32px;
    padding-top: 32px;
  }

  &.apple {
    background-position: -563px -488px;
    width: 32px;
    padding-top: 32px;
  }
`;

const LoginSignupContent = styled.div`
  width: 100%;
`;

const CouponImg = styled.img``;
const NeedLogin = styled.p``;
const BackgroundText = styled.span``;
const Text = styled.strong``;
const Background = styled.span``;

const LoginHeadText = styled.div`
  margin-bottom: 30px;

  p {
    color: #333333;
    text-align: center;
  }

  ${NeedLogin} {
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  ${BackgroundText} {
    width: 50px;
    height: 19px;
    position: relative;

    > ${Text} {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    > ${Background} {
      width: 100%;
      height: 15px;
      background: #fbd3bc;
      position: absolute;
      top: 7px;
      left: 0;
    }
  }

  ${CouponImg} {
    width: 100%;
    margin-top: 5px;
  }
`;

// const IconLogo = styled.span`
//   background-position: -91px -488px;
//   width: 100px;
//   padding-top: 40px;
//   background-image: url(https://www.idus.com/resources/dist/images/sp/sp-icon_1634026706070.png);
//   height: 0;
//   overflow: hidden;
//   display: inline-block;
//   vertical-align: middle;
//   font-size: 0;
//   line-height: 0;
//   letter-spacing: 0;

//   @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
//     background-image: url(https://www.idus.com/resources/dist/images/sp/sp-icon_1634026706070@2x.png);
//     -webkit-background-size: 787px 736px;
//     -moz-background-size: 787px 736px;
//     -o-background-size: 787px 736px;
//     background-size: 787px 736px;
//   }
// `;

const LoginHeadLogo = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-bottom: 10px;
`;

const LoginContainer = styled.div`
  background: #ffffff;

  @media (min-width: 720px) {
    padding: 1px 0 50px;
    width: 384px;
    display: block;
    margin: 0 auto;
  }
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;
