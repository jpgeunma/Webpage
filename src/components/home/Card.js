import CardImg from "../../images/desk.jpg"

export default function Card(props) {


    return(
        <article className="card-wrapper">
            <a href="/">
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
            </a>
        </article>
    )
}