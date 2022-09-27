import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import CardList from "./home/CardList"
import tablePicture from "../images/desk2.jpg";
import profilePicture from "../images/fb-logo.png"
import styled, {css} from 'styled-components';
import "../style/Post.css"
import "../style/HashTag.css"
import Header from "./Header";
import axios from "axios";
import ImageSlider from "./post/component/ImageSlider";

const PICTURE_API_BASE_URL = "http://localhost:8080/api/v1/pictures";

export default function Post(props) {

    const [imageShow, setImageShow] = useState([]);
    const [board, setBoard] = useState([]);
    const [pictures, setPictures] = useState([]);
    const {id} = useParams();
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


    console.log("Posts " + params);
    console.log("Posts window " + window.location);
    const createPost = () => {
        navigate("/write-board");
    }

    useEffect(() => {
        AuthenticationService.getBoard( params ).then((res) => {
            console.log("AuthenticationService.getBoard ", res, id);
            setBoard(res.data);
        })
        .catch((Error) => {
            console.log(Error);
        });
        
        async function fetchData() {
            const result = await axios.get(
              "http://localhost:8080/api/v1/pictures/" + params
            );
            console.log("result ", result);
            let images = [];
            result.data.result.map((fileName, idx) => {
                console.log("result filename", fileName);
                console.log("result idx", idx);
                const img = {
                id: idx + 1,
                url: "http://localhost:8080/api/v1/pictures/test/" + fileName.fileName,
              };
              console.log("result img", img);
              images.push(img);
            });
            setImageShow(images);
          }
          fetchData();
    }, [id])
    
    return(
        <>
        <Header />
        <div className="top-wrapper">


            <main className="main">
                <article className="grid-article">
                    <div className="main-img-wrapper">
                                {/* {imageShow.map((img, index) => {
                                return (
                                <UiSlider
                                    key={index}
                                    id={"img_" + img.id}
                                    style={{
                                    width: "560px",
                                    backgroundImage: "url(" + img.url + ")",
                                    }}
                                >
                                </UiSlider>
                                );})}      */}

                            <ImageSlider imageFiles={imageShow} /> 
                    </div>
                    <div className="writer-and-content-wrapper">
                        <section className="writer-profile-wrapper">
                            <h3 className="hide">
                                프로필
                            </h3>
                            <div className="writer-profile">
                                <div className="profile-picture">
                                    <a href="http://localhost:3000/"> 
                                        <img alt="basic profile" src={profilePicture} />
                                    </a>
                                </div>
                                <div className="writer">
                                    {userName}
                                </div>
                            </div>
                            <div className="writer-heart-temp">
                                    35.2C
                            </div>
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
                                viewed: {viewed}  ∙
                                favorites: {favorites} ∙
                                commentNum: {comments}
                            </div>
                        </section>
                    </div>
                    <div className="product-event-wrapper">
                        <div className="title-wrapper">
                            <div> {title}</div>
                        </div>
                        <button className="chat-button" type="button">チャット</button>
                        <div className="product-detail">
                            <div className="hash-div-wrapper">
                                <div className="hash-wrapper">
                                    <span className="hash-input">カテゴリー</span>
                                    <div className="hash">#岡山</div>
                                    <div className="hash">#自転車</div>
                                </div>
                            </div>
                            <div className="detail-display-row"></div>
                            <div className="detail-display-row"></div>
                            <div className="detail-display-row"></div>
                        </div>
                    </div>

                </article>

                <section className="hot-more">
                    <CardList 
                    index = {8}/>
                </section>
            </main>
             
        </div>
        </>
    )
}


const UiSlider = styled.li`
  width: 520px;
  display: list-item;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  height: auto;
  float: left;
  list-style: none;

  &:first-child {
    display: block;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;