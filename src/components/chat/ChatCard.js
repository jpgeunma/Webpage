import React from "react";
import { styled } from "@mui/system";
import { palette } from "@mui/system";
import { useSelector } from 'react-redux';

const Card = styled('div')({
    width: '100%',
});
const SenderDate = styled('span')({
    float: 'left',
    width: '98.5%',
    textAlign: 'right',
});
const ReceiverDate = styled('span')({
    float: 'left',
    width: '100%',
    paddingLeft: '15px',
});

const SenderCard = styled('div')({
    float: 'right',
    display: 'inline-block',
    padding: '20px',
    margin: '10px',
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '10px'
});

const ReceiverCard = styled('div')({
    float: 'left',
    display: 'inline-block',
    padding: '20px',
    margin: '10px',
    backgroundColor: 'grey',
    borderRadius: '10px',
});


const ChatCard = ({ item }) => {
    const { nickname } = useSelector(({ user }) =>  ({ nickname: user.user.nickname }));
    
    return(
        <>
            {
                item.sender === nickname ?     
                <Card>
                    <SenderCard>
                        { item.content }
                    </SenderCard>
                    <SenderDate>
                        { item.createdAt }
                    </SenderDate>
                </Card> :
                <Card>
                    <ReceiverCard>
                        { item.content }
                    </ReceiverCard>
                    <ReceiverDate>
                        { item.createdAt }
                    </ReceiverDate>
                </Card>
            }
        </>
    );
};

export default ChatCard;