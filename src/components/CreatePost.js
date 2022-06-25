import React from "react";
import { useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function CreatePost(props) {
    
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        type: '1',
        title: '',
        author: 'gangjek', // TODO
        content: ''
    });

    const postInput = useRef();

    const {type, title, content, author} = inputs;

    const changeType = (event) => {
        event.preventDefault();
        const {value} = event.target;
        setInputs({
            ...inputs,      // 그 전 값 복사
            type : value
        });
    }
    const changeTitle = (event) => {
        event.preventDefault();
        const {value} = event.target;
        setInputs({
            ...inputs,      // 그 전 값 복사
            title : value
        });
    }
    const changeContent = (event) => {
        event.preventDefault();
        const {value} = event.target;
        setInputs({
            ...inputs,      // 그 전 값 복사
            content : value
        });
    }


    const createBoard = (event) => {
        inputs.author = cookies.get("user");
        AuthenticationService.CreateBoardService(inputs).then(res => {
            navigate('/board');
        });

    }

    const cancel = () => {
        navigate('/board');
    }



    return (
            <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control" 
                                    value={type} onChange={changeType}>
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className = "form-group">
                                    <label> Title </label>
                                    <input type="text" placeholder="title" name="title" className="form-control" 
                                    value={title} onChange={changeTitle}/>
                                </div>
                                <div className = "form-group">
                                    <label> Contents  </label>
                                    <textarea placeholder="contents" name="contents" className="form-control" 
                                    value={content} onChange={changeContent}/>
                                </div>
                                <button className="btn btn-success" onClick={createBoard}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}