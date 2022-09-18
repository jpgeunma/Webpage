import axios from "axios";
import Card from "./Card"
import "./../../style/CardList.css"
import { useState, useEffect } from "react";

const HOT_LIST_URL = "http://localhost:8080/api/v1/posts";

export default function Home(){

    const [hotPosts, setHotPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(Boolean);
    
    const getPosts = () => axios.get(`${HOT_LIST_URL}/hot`).then(res=>{return res;});

    useEffect(() => {
        getPosts().then(results => {
            setHotPosts(results); 
            setIsLoaded(true); 
            console.log(results);});
    }, [])



    return (
            <div className="cardList-wrapper">
                {isLoaded &&
                    hotPosts.data.map(post => (
                    <Card
                    id = {post.id}
                    title = {post.title}
                    cost = {post.cost}
                    location = {post.location}
                    scribe = {post.favoritesNum}
                    commentNum = {post.commentsNum}
                    />
                ))}
            </div>
    );
};
