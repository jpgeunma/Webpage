import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import testImage from  "./../../images/airbnb-logo.png" 
import {
  getUsers,
  countNewMessages,
  findChatMessages,
  findChatMessage,
} from "./ApiUtil";
import { Cookies } from "react-cookie";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import Profile from "./component/Profile";

const cookies = new Cookies();
var stompClient = null;

const Chat = (props) => {
  const {postId} = useParams();

  const currentUser = {
    id: 1,
    profilePicture: testImage,
    name: cookies.get("email"),
  };
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (cookies.get("token") === null) {
      // TODO
      //props.history.push("/login");
    }
    connect();
    loadContacts();
  }, []);

  useEffect(() => {
    if (activeContact === undefined) return;
    findChatMessages(activeContact.id, postId).then((msgs) =>
      setMessages(msgs)
    );
    loadContacts();
  }, [activeContact]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    //SockJS = new SockJS("http://localhost:8080/ws")
    SockJS = new SockJS("http://localhost:8080/ws", null, {
      headers: {'Authorization': cookies.get('token') }
    });
    stompClient = Stomp.over(SockJS);
    stompClient.connect({
      Authorization: cookies.get('token')
    }, onConnected, onError);
    //stompClient.connect({}, onConnected, onError);

  };

  const onConnected = () => {
    console.log("connected");
    console.log(currentUser);
    stompClient.subscribe(
      "/user/" + currentUser.id + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
      .chatActiveContact;

    if (active.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
          .chatMessages;
        newMessages.push(message);
        setMessages(newMessages);
      });
    } else {
      message.info("Received a new message from " + notification.senderName);
    }
    loadContacts();
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: currentUser.id,
        postId: postId,
        senderName: currentUser.name,
        recieverName: activeContact.name,
        content: msg,
      };
      stompClient.send("/webs/chat", {"Authorization": cookies.get("token")}, JSON.stringify(message));
      
      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

  const loadContacts = () => {
    const promise = getUsers().then((users) =>{
        console.log("users: ", users);
      users.map((contact) =>
        countNewMessages(contact.id, postId).then((count) => {
          contact.newMessages = count;
          return contact;
        }));
        setContacts(users);

    });

    if (activeContact === undefined) {
        setActiveContact(contacts[0]);
      }
  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">
            <img
              id="profile-img"
              src={currentUser.profilePicture}
              class="online"
              alt=""
            />
            <p>{currentUser.name}</p>
            <div id="status-options">
              <ul>
                <li id="status-online" class="active">
                  <span class="status-circle"></span> <p>Online</p>
                </li>
                <li id="status-away">
                  <span class="status-circle"></span> <p>Away</p>
                </li>
                <li id="status-busy">
                  <span class="status-circle"></span> <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span class="status-circle"></span> <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="search" />
        <div id="contacts">
           <ul>
            {contacts.map((contact) => (
              <li
                onClick={() => setActiveContact(contact)}
                className={
                  activeContact && contact.id === activeContact.id
                    ? "contact active"
                    : "contact"
                }
              >
                <div class="wrap">
                  <span class="contact-status online"></span>
                  <img id={contact.id} src={testImage} alt="" />
                  <div class="meta">
                    <p class="name">{contact.email}</p>
                    {contact.newMessages !== undefined &&
                      contact.newMessages > 0 && (
                        <p class="preview">
                          {contact.newMessages} new messages
                        </p>
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul> 
          <Profile>

          </Profile>
        </div>
        <div id="bottom-bar">
          <button id="addcontact">
            <i class="fa fa-user fa-fw" aria-hidden="true"></i>{" "}
            <span>Profile</span>
          </button>
          <button id="settings">
            <i class="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="contact-profile">
          <img src={activeContact && activeContact.profilePicture} alt="" />
          <p>{activeContact && activeContact.name}</p>
        </div>
        <ScrollToBottom className="messages">
          <ul>
            {messages.map((msg) => (
              <li class={msg.senderId === currentUser.id ? "sent" : "replies"}>
                {msg.senderId !== currentUser.id && (
                  <img src={activeContact.profilePicture} alt="" />
                )}
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </ScrollToBottom>
        <div class="message-input">
          <div class="wrap">
            <input
              name="user_input"
              size="large"
              placeholder="Write your message..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />

            <Button
              icon={<i class="fa fa-paper-plane" aria-hidden="true"></i>}
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
