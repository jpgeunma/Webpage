import React from "react";
import { styled } from "@mui/system";
import { palette } from "@mui/system";

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



export default function ChatCard() {
    return(
        <>
            <Card>
                <ReceiverCard>
                    asdsadsadsa
                </ReceiverCard>
                <ReceiverDate>
                    2020-01-01
                </ReceiverDate>
            </Card>
            <Card>
                <SenderCard>
                    asdsadsad
                </SenderCard>
                <SenderDate>
                    2020-01-02
                </SenderDate>
            </Card>
        </>
    );
};
