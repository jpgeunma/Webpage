import axios from "axios";
import Banner from "./Banner"
import Card from "./Card"
import "./../../style/Home.css"
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";
import CardList from "./CardList"
import BannerImg from "../../images/banner.jpg"

export default function Home(){

    const mainFeaturedPost = {
        title: 'Title of a longer featured blog post',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: "https://source.unsplash.com/random",
        imageText: 'main image description',
        linkText: 'Continue reading…',
        };

    return (
        <div className="home-wrapper">
            <Banner
                post={mainFeaturedPost}     
                />
            <div className="cardList-wrapper">
                <CardList />
            </div>

        </div>
    );
};
