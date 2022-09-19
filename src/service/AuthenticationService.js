import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router";
import { Cookies } from "react-cookie";
const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/posts";
const PICTURE_API_BASE_URL = "http://localhost:8080/api/v1/pictures";
const cookies = new Cookies();

export default class AuthenticationService{

    setHeader(apiPack){
        const token = cookies.get("token");
        const email = cookies.get("email");
        if(token) {
            apiPack.headers["token", "email"] = {token, email};
        }
        return apiPack;
    }

    static CreateBoardService(board){
        window.alert("CreateBaordService  ", cookies.get("token"));
        axios({
            method: 'post',
            url: `${BOARD_API_BASE_URL + "/save"}`,
            headers: {
                'Content-type':'application/json',
                Authorization : `${cookies.get("token")}`,
            },
            data: {
                title: board.title,
                content: board.content,
                author: board.author,
            }
        }).then((res) => {
            console.log(res);
            const postId = res.data;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : `${cookies.get("token")}`,
                },
            };
    
            console.log("board", postId);
            // append type should designated as below
            board.pictures.append('requestDto',  new Blob([JSON.stringify({boardId: postId, fileName: "test.png"})], {type : 'application/json'}));
            console.log("board", board);
            return axios.post(PICTURE_API_BASE_URL + "/upload", board.pictures, config);
        }).catch(res=>{
            console.warn(res);
        })


        console.log("CreateBoardService board ", board);



    }

    static getBoard(props) {
        console.log("getBoard " + props);
        return axios({
            method: 'get',
            url: `${BOARD_API_BASE_URL + "/" + props}`,
            headers: {
                'Content-type': 'application/json',
            },
        });

    }

    getLoggedInUserName() {

    }

    isUserLoggedIn() {
        const token = localStorage.getItem("token");

        if(token)
            return true;

        return false;
    }

    logout() {
        localStorage.removeItem("token")
    }
}    

