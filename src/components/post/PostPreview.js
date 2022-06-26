import React, {Fragment} from "react";
import { Link } from "react-router-dom";

const PostPreview = ({post}) => {
    if(post === undefined) {
        return null;
    }

    let postBody = post.get("content");
    if (postBody.length > 300) {
        postBody = postBody.substring(0, 300) + '...';
    }

    return (
        <Fragment>
            <div>
                <h2 className="post-title">
                    <Link to={"/posts/" + post.get("id")}>{post.get("title")}</Link>
                </h2>
                <div className="post-meta">
                    Posted byh {post.get("author")}
                    <span> {`  `}</span>
                </div>
            </div>
        </Fragment>
    )
}


export default PostPreview;