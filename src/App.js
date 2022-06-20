import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {createContext, useContext} from "react";
import Header from './components/Header';
import Home from "./components/home/Home"
import Login from "./components/login/Login.js"
import { useEffect, useRef, useState } from "react";
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import LoginResult from "./components/login/LoginResult.js"

// start wih npm run start
export default function App() {
    const [authenticated, setAuth] = useState(true);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setLoading] = useState(true);


  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/board" element={<Post/>}></Route>
        <Route path="/login/redirect" element={<LoginResult/>}></Route>
        <Route path="/board/write" element={<CreatePost/>}></Route>
      </Routes>

    
    </BrowserRouter>
    
    );
};

