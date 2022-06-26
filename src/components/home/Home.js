import axios from "axios";
import Banner from "./Banner"
import Card from "./Card"
import "./../../style/Home.css"
import PostPreview from "../post/PostPreview";
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";

const HOT_LIST_URL = "http://localhost:8080/api/v1/posts";

export default function Home(){

    const [hotPosts, setHotPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(Boolean);

    const getPost = (postId) => axios.get(`${HOT_LIST_URL}/${postId}`);
    const getPosts = () => axios.get(`${HOT_LIST_URL}/hot`).then(res=>{return res;});
    const getToken = () => {
        const cookies = new Cookies();
        const token = cookies.get("token");
        return `Bearer ${token}`;
    }

    useEffect(() => {
        getPosts().then(result => {setHotPosts(result); setIsLoaded(true); console.log(result);});
        
    }, [])



    return (
        <div className="home-wrapper">
            <Banner/>
            <div className="cardList-wrapper">
                {isLoaded &&
                    hotPosts.data.map(post => (
                    <Card
                    id = {post.id}
                    title = {post.title}
                    cost = {post.cost}
                    location = "Okayama"
                    scribe = "0"
                    commentNum = "123"
                    />
                ))}
            </div>

        </div>
    );
};
