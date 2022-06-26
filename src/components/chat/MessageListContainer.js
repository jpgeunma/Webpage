import React, { useEffect, useState } from 'react';
import { styled } from "@mui/system";
import SearchBar from "./InputBar"
import SearchButton from "./InputButton"
import MessageCard from "./MessageCard"
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readUserList } from './logic/messageList';
import { changeField } from './logic/send';


const Wrap = styled('div')({
    float: 'left',
    width: '30%',
    height: 'calc(100vh - 150px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRight: '1px solid',
});


const Header = styled('div')({
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '1.5rem',
});

const ListBox = styled('div')({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
    width: '100%',
});

const EmptyBox = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const MessageListContainer = () => {
    const dispatch = useDispatch();
    const {
        nickname,
        sender,
        userList, 
        error 
    } = useSelector(({
        messageList,
        send,
        user
    }) => ({
        nickname: user.user.nickname,
        sender: send.sender,
        userList: messageList.userList,
        error: messageList.error,
    }));

    useEffect(() => {
        dispatch(readUserList(sender));
    }, [dispatch, sender]);

    useEffect(() => {
        dispatch(changeField({
            key: 'sender',
            value: nickname
        }));
    }, [dispatch, nickname]);

    const onClick = e => {
        const item = e.target.innerText.split(' ');

        dispatch(changeField({
            key: 'receiver',
            value: item[0]
        }));
    };

    useEffect(() => {
        userList &&
        userList.forEach((user, index, array) => {
            for(var i = 0; i < userList.length; i++) {
                if(index === i) {
                    continue;
                } else if(
                    user.sender === userList[i].receiver &&
                    user.receiver === userList[i].sender
                ) {
                    userList.splice(i, 1);
                }
            }
        });
    }, [userList]);

    return(
        <Wrap>
            <Header>
                <SearchBar placeholder="닉네임을 입력해주세요" />
                <SearchButton text="검색" />            
            </Header>
            <ListBox>
                {
                    userList ?
                    userList.map((item, i) => {
                        return <MessageCard item={ item } 
                                            i={ i } 
                                            onClick={ onClick }
                               />
                    }) : 
                    <EmptyBox>
                        메시지함이 비어있습니다!
                    </EmptyBox>
                }
            </ListBox>
        </Wrap>
    );
};

export default MessageListContainer;