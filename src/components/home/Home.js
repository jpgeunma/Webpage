import axios from "axios";
import Banner from "./Banner"
import Card from "./Card"
import "./../../style/Home.css"
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";
import CardList from "./CardList"
export default function Home(){


    return (
        <div className="home-wrapper">
            <Banner/>
            <div className="cardList-wrapper">
                <CardList />
            </div>

        </div>
    );
};
