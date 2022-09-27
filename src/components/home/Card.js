import axios from "axios";
import {Navigate, Link} from "react-router-dom"
import { useState, useEffect } from "react"
import "./../../style/Card.css"
const PICTURE_LIST_URL = "http://localhost:8080/api/v1/pictures";

export default function Card(props) {

    const [picture, setPicture] = useState([]);

    const getSamplePictures = (postId) => axios.get(`${PICTURE_LIST_URL + "/thumb/" + postId}`).then(res=>{return res;});

    
    useEffect(() => {
        getSamplePictures(props.id).then((res) => {
            setPicture(res.request.responseURL);
            console.log(res);
        })
    })

    return(
        <article className="card-wrapper">
            <Link className="card-link" to={"/posts/" + props.id}>
                <div className="card-img-wrapper">
                    <img alt="Product Image" src={picture} className="card-img"/>
                </div>
                <div className="card-info-wrapper">
                    <div className="card-title">{props.title}</div>
                    <div className="card-cost">{props.cost}円</div>
                    <div className="card-location">{props.location}</div>
                    <div className="card-info">
                        <span>気になる{props.scribe}  ∙</span>
                        <span>コメント{props.commentNum}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}