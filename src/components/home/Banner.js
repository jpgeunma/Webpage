import BannerImg from "../../images/banner.jpg"
import "../../style/Banner.css"
import {Link} from "react-router-dom"

export default function Banner() {

    return (
        <div className="Banner-wrapper">
            <Link to="/">
                <img alt="Banner" src={BannerImg} className="Banner-img"/>
            </Link>
        </div>
    )
}