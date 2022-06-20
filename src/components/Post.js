import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../service/AuthenticationService";

import tablePicture from "../images/desk2.jpg";
import profilePicture from "../images/fb-logo.png"

import "../style/Post.css"

export default function Post(props) {

    const [board, setBoard] = useState("",[]);
    const navigate = useNavigate();
    const title = "ㅈㄴ 싸다구!";
    const image = tablePicture;
    const userName = "KUKUKU"; 
    const content = "싸게 팔아유~~";
    const price = "1000원";
    const category = "가구";

    const viewed = 1000;
    const comments = 24;
    const favorites = 9;

    const getPost = () => {
        AuthenticationService.getBoard().then((res) => {
            setBoard({board: res.data})
        })
    }

    const createPost = () => {
        navigate("/write-board");
    }
    
    return(
        <div className="top-wrapper">
            <div className="title-wrapper">
                <th >{title}</th>
            </div>

            <main className="main">
                <article className="grid-article">
                    <div className="upper-wrapper">
                            <div className="main-img-wrapper">
                                <img alt={title} className="img-wrapper" src={image}/>
                            </div>
                            <section className="img-list-wrapper">

                            </section>
                    </div>

                    <div className="writer-and-content-wrapper">
                        <section className="writer-profile-wrapper">
                            <a href="http://localhost:3000/">
                                <h3 className="hide">
                                    프로필
                                </h3>
                                <div className="writer-profile">
                                    <div className="profile-picture">
                                        <img alt="basic profile" src={profilePicture} />
                                    </div>
                                    <div className="writer">
                                        {userName}
                                    </div>
                                </div>
                                <div className="writer-heart-temp">

                                </div>
                            </a>
                        </section>


                        
                        <section className="product-info-wrapper">
                            <div className="category-wrapper">
                                {category}
                            </div>
                            <div className="price-wrapper">
                                {price}
                            </div>
                            <div className="content-wrapper">
                                {content}
                            </div>
                            <div className="post-info-wrapper">
                                viewed: {viewed}
                                favorites: {favorites}
                                commentNum: {comments}
                            </div>
                        </section>
                    </div>
                </article>
            </main>
             
        </div>

    )
}