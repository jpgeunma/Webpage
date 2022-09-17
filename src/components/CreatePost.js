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
        pictures: new FormData(),
        type: '1',
        title: '',
        content: '',
        author: ''
    });

    const postInput = useRef();

    const {pictures, type, title, content, author} = inputs;
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

    const changePictures = (event) => {
        event.preventDefault();
        const value = event.target;
        const formData = new FormData();
        console.log("files ", value.files[0]);
        formData.append('file',  value.files[0]);
        setInputs({
            ...inputs,
            pictures : formData,
        })
        console.log("test ", inputs.pictures.has('file'));
    }


    const createBoard = (event) => {
        inputs.author = cookies.get("email");
        console.log("createBoard " + inputs.author);
        console.log("createBoard title " + inputs.title);
        console.log("createBoard content " + inputs.content);
        console.log("createBoard pictures " + inputs.pictures);
        console.log("createBoard event " + event);
        AuthenticationService.CreateBoardService(inputs).then(() => {
            navigate('/');
        });
        
    }

    const cancel = () => {
        navigate('/');
    }



    return (
            <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                        <div className = "card-body">
                            <form>
                                <input type="file" accept="image/*" onChange={changePictures}/>
                                <label htmlFor="image">choose file</label>
                            </form>
                            <form>
                                {/* <div className="button">
                                    <label form="chooseFile">
                                        Click
                                    </label>
                                    <input type="file" accept="image/*" onChange={changePictures}/>
                                </div> */}
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
                                 {/* button은 기본적type을 summit으로 가진다--> 2번씩 메세지를 보내서 쥐소 되는 문제가 발생 그래서 type='button'으로 함 */}
                                <button className="btn btn-success" onClick={createBoard} type="button">Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}