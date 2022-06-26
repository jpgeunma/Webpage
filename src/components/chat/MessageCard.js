import React from "react";
import { styled } from "@mui/system";
import { palette } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux';




const Card = styled('div')({
    width: '100%',
    height: '80px',
    paddingTop: '1rem',
    paddingLeft: '4rem',

    ":hover":{
        backgroundColor: 'grey'
    }
});


const Nickname = styled('div')({
    width: '60px',
    float: 'left',
});


const Date = styled('div')({
    float: '100%',
    width: '30%',
    height: '40px',
});

const Content = styled('div')({
    width: '100%',
    height: '80px',
    overflow: 'hidden',
});


const MessageCard = ({ 
    item, 
    i, 
    onClick,
}) => {
    const { nickname } = useSelector(({ user }) => ({ nickname: user.user.nickname }));
    
    return(
        <Card onClick={ onClick }>
            <Nickname>
                { item.receiver === nickname ? item.sender : item.receiver } 님과의 채팅 
            </Nickname>
        </Card>
    );
};

export default MessageCard;