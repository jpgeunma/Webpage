
import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import airbnbLogo from "../images/airbnb-logo.png"
import OauthLogin from "../service/OauthLogin";
import {makeStyles} from '@mui/material';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications'
import "../style/Header.css"
import { useState, useEffect } from 'react';

export default function Header(props) {

    const sections = [
        { title: '中古品', url: '#' },
        { title: '地域', url: '#' },
        { title: '質問', url: '#' },
      ];


    // return (
    //     <div className="header-wrapper">
    //         <div className="navigation-top">
    //             <a href="http://localhost:3000">
    //                 <img src={airbnbLogo} className="header-logo" />
    //             </a>
    //         </div>
            
    //         <div className="search-box" slot="input">
    //             <form className="search-form" role="search">
    //                 <input type="search" className="search-input" placeholder="検索"/> 
    //                 <button></button>              
    //             </form>
    //         </div>

    //         <div className="user-box">
    //             <h3 className="login">
    //                 <OauthLogin/>
    //                 <a href="http://localhost:3000/board/write">
    //                     글쓰기
    //                 </a>
    //             </h3>
    //         </div>
    //     </div>
    // ) 

    return (
        <React.Fragment>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Link href="/">
              <Box
                component="img"
                sx={{
                  height: 100
                }}
                alt="logo"
                src={airbnbLogo}
              />
            </Link>
            <div className="search-box" slot="input">
                 <form className="search-form" role="search">
                    <input type="search" className="search-input" placeholder="検索"/> 
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                 </form>
             </div>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              {"title"}
            </Typography>
              <React.Fragment>
                {false === false ? (
                  <React.Fragment>
                            <Button variant="outlined" size="small" href='/login'>
                              Sign up
                            </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton color="inherit" href='/login/profile'>
                        <Badge badgeContent={4} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                    </IconButton>
                  </React.Fragment>
                )}
              </React.Fragment>
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'flex-end', overflowX: 'auto' , padding: 0}}
          >
            {sections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                sx={{ p: 1, flexShrink: 0 }}
              >
                {section.title}
              </Link>
            ))}
          </Toolbar>

        </React.Fragment>
      );
}