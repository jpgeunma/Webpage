import BannerImg from "../../images/banner.jpg"
import "../../style/Banner.css"


export default function Banner() {

    return (
        <div className="Banner-wrapper">
            <a href="/">
                <img alt="Banner" src={BannerImg} className="Banner-img"/>
            </a>
        </div>
    )
}