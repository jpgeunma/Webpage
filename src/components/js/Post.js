import { useState } from "react";

export default function Product( { post: p}) {
    const [post, setPost] = useState(p);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(post.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    function toggleDone() {
        fetch(`http://localhost:3001/api/v1/posts/${post.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...post,
                isDone: !isDone,
            }),
        }).then(res => {
            if (res.ok) {
                setIsDone(!isDone);
            }
        });
    }

    function del() {
        if (window.confirm("delete?")) {
            fetch(`http://localhost:3001/api/v1/posts/${post.id}`,{
                method: "DELETE",
            }).then(res => {
                if (res.ok) {
                    setPost({id: 0});
                }
            });
        }
    }

    if (post.id === 0) {
        return null;
    }

    return (
        <tr className={isDone ? "off" : ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone} />
            </td>
            <td>{post.eng}</td>
            <td>{isShow && post.kor}</td>
            <td>
                <button onClick={toggleShow}> mean {isShow ? "hide" : "show"}</button>
                <button onClick={del} className="btn_del">
                    delete
                </button>
            </td>
        </tr>
    )
}