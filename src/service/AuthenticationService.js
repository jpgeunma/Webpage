import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router";
import { Cookies } from "react-cookie";
import { BoyRounded } from "@mui/icons-material";
const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/posts";
const PICTURE_API_BASE_URL = "http://localhost:8080/api/v1/pictures";
const FAVORITE_API_BASE_URL = "http://localhost:8080/api/v1/favorites";

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

    static async CreateBoardService(board){
        console.log("CreateBaordService  ", cookies.get("token"));
        console.log("CreateBoardService  ", cookies.get("email"))
        const token = await cookies.get("token", {path: "/"});
        const email = await cookies.get("email", {path: "/"});
        await axios({
            method: 'post',
            url: `${BOARD_API_BASE_URL + "/save"}`,
            headers: {
                'Content-type':'application/json',
                Authorization : token,
            },
            data: {
                title: board.title,
                content: board.content,
                author: email,
                email: email,
                price: board.price,
                location: board.location,
            }
        }).then((res) => {
            console.log(res);
            const postId = res.data;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : token,
                },
            };
            const formData = new FormData();
            console.log("board", postId);
            // append type should designated as below
            //board.pictures.append('requestDto',  new Blob([JSON.stringify({boardId: postId, fileName: board.imageFiles})], {type : 'application/json'}));
            // for(let i = 0; i < board.imageFiles.length; i++)
            // {
            //     formData.append('requestDto',  new Blob([JSON.stringify({fileName: board.imageFiles[i].name})], {type : 'application/json'}));
            // }
            board.imageFiles.map((files) => {
                formData.append("file", files);
            })
            formData.append("postId", new Blob([JSON.stringify(postId)], {type : 'application/json'}))
            console.log("board", board);
            return axios.post(PICTURE_API_BASE_URL + "/upload", formData, config);
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

    static async saveFavorite(props) {
        console.log("saveFavorties", props);
        const token = await cookies.get("token", {path: "/"});
        const email = await cookies.get("email", {path: "/"});
        await axios({
            method: 'post',
            url: `${FAVORITE_API_BASE_URL}`,
            headers: {
                'Content-type':'application/json',
                Authorization : token,
            },
            data: {
                postId: props.postId,
            }
        })
    }

    static async deleteFavorite(props) {
        console.log("deleteFavorite", props);
        const token = await cookies.get("token", {path: "/"});
        const email = await cookies.get("email", {path: "/"});
        await axios({
            method: 'delete',
            url: `${FAVORITE_API_BASE_URL + "/" + props.postId}`,
            headers: {
                'Content-type':'application/json',
                Authorization : token,
            }
        })
    }

    static async checkFavorite(props) {
        console.log("checkFavorite", props);
        const token = await cookies.get("token", {path: "/"});
        const email = await cookies.get("email", {path: "/"});
        return await axios({
            method: 'get',
            url: `${FAVORITE_API_BASE_URL + "/" + props.postId}`,
            headers: {
                'Content-type':'application/json',
                Authorization : token,
            }
        })
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

