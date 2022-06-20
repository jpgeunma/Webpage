import axios from "axios";
import { useContext } from "react";
import { tokenDispatch } from "../components/login/LoginResult";

const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/posts";


axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token) {
            config.headers["token", "email"] = {token, email};
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)


export default class AuthenticationService{

    

    static CreateBoardService(board){
    
        console.log("board => "+ JSON.stringify(board));
        axios.post(BOARD_API_BASE_URL, board).catch(res => {
            window.alert(res);
            
        })
        return axios.post(BOARD_API_BASE_URL, board);
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

