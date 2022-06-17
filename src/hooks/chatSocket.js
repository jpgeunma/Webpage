import SockJs from "sockjs-client"
import StompJs from "stompjs"


const sock = new SockJs("http://localhost:8080/");

const stomp = StompJs.over(sock);

// const stompContent = () => {
//     try {
//         stomp.debug = null;
        
//         stomp.connect(token, () => {
//             stomp.subscribe(
//                 `http://localhost:8080/`,
//                 (data) => {
//                     const newMessage = JSON.parse(data.body);
//                 },
//                 token
//             );
//         });
//     }catch(err){

//     }
// }


// const stompDisConnect = () => {
//     try{
//         stomp.debug = null;
//         stomp.disconnect(() => {
//             stomp.unsubscribe("sub-0");
//         }, token);
//     }catch(err) {

//     }
// };

// const sendMessage = () => {
//     stomp.debug = null;
//     const data = {
//         type: "TALK",
//         roomId: roomId,
//         sender: sender_nick,
//         message: message,
//         createdAt: now,
//     };

//     stomp.send("/pub/chat/message", token, JSON.stringify(data));
};