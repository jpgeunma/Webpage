import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from "./components/home/Home"
import Login from "./components/login/Login.js"
import { useEffect, useRef, useState } from "react";
import Post from './components/Post';
import CreatePost from './components/post/CreatePost';
import MessagePage from "./components/chat/MessagePage.js"
import Profile from './components/login/Profile';
import Register from './components/login/Register';
import CheckRegister from "./components/login/CheckRegister"
import React, { Component } from 'react';
// start wih npm run start

export default function App() {
    const [authenticated, setAuth] = useState(Boolean);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setLoading] = useState(true);


  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/login/profile" element = {<Profile/>}></Route>
              <Route path="/login/register" element = {<Register/>}></Route>
              <Route path="/login/checkRegister" element = {<CheckRegister/>}> </Route>
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route path="/board/write" element={<CreatePost/>}></Route>
              <Route exact path="/message" element={<MessagePage/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    
    );
};

