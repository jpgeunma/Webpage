import axios from "axios";
import Banner from "./Banner"
import Card from "./Card"
import "./../../style/Home.css"

const HOT_LIST_URL = "http://localhost:3000/hot/";

export default function Home(){

    const getHotList = () =>{
        return axios.get(HOT_LIST_URL);
    }

    const hotList = getHotList();

    console.log(hotList);
    return (
        <div className="home-wrapper">
            <Banner/>
            <div className="cardList-wrapper">
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />
                <Card
                    title = "Desk"
                    cost = "5000円"
                    location = "OKayama"
                    scribe = "50"
                    commentNum = "20"
                />

            </div>

        </div>
    );
};
