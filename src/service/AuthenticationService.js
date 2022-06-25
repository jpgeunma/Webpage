import axios from "axios";
import { useContext } from "react";
import { tokenDispatch } from "../components/login/LoginResult";
import { Cookies } from "react-cookie";
const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/posts";

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
        window.alert(cookies.get("token"));
        axios({
            method: 'post',
            url: `${BOARD_API_BASE_URL}`,
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
        }).catch(res=>{
            window.alert(res);
        })
    }

    getBoard() {
        return axios.get(BOARD_API_BASE_URL);
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

