import CardImg from "../../images/desk.jpg"
import {Link} from "react-router-dom"

export default function Card(props) {


    return(
        <article className="card-wrapper">
            <Link to={"/posts/" + props.id}>
                <div>
                    <img alt="Card" src={CardImg} className="card-img"/>
                </div>
                <div>
                    <h2>{props.title}</h2>
                    <div>{props.cost}</div>
                    <div>{props.location}</div>
                    <div>
                        <span>気になる{props.scribe}</span>
                        <span>コメント{props.commentNum}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}