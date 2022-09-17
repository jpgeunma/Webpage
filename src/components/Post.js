import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

import tablePicture from "../images/desk2.jpg";
import profilePicture from "../images/fb-logo.png"

import "../style/Post.css"

const PICTURE_API_BASE_URL = "http://localhost:8080/api/v1/pictures";

export default function Post(props) {

    const [board, setBoard] = useState([]);
    const [pictures, setPictures] = useState([]);
    // const params = useParams();
    // can't use useParams hook -----> will use window.location 
    // TODO have to change later
    const params = window.location.pathname.split('/').at(-1);
    const navigate = useNavigate();
    let title = board.title;
    let userName = board.author;
    let content = board.content;
    let price = board.cost;
    let category = board.category == null ? "fur" : board.category;
    let viewed = board.viewed;
    let comments = board.commentsNum;
    let favorites = board.favoritesNum;

    // TODO 
    // image should be image list
    let image = PICTURE_API_BASE_URL + "/test.png";

    console.log("Posts " + params);
    console.log("Posts window " + window.location);
    const createPost = () => {
        navigate("/write-board");
    }

    useEffect(() => {
        AuthenticationService.getBoard( params ).then((res) => {
            console.log(res);
            setBoard(res.data);
        })
        .catch((Error) => {
            console.log(Error);
        });
        
    }, [])
    
    return(
        <div className="top-wrapper">
            <div className="title-wrapper">
                <div> {title}</div>
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