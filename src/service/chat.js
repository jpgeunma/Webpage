import axios from "axios";

export const send = ({
    sender,
    receiver,
    content,
}) => axios.post("/message-service/send", {
    sender,
    receiver,
    content,
})

export const getUserList = receiver => axios.get("/message-service/user-list", receiver);

export const getMessageList = ({
    sender,
    receiver,
}) => axios.get("/message-service/message-list", {
    sender,
    receiver,
})