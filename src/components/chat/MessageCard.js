import React from "react";
import { styled } from "@mui/system";
import { palette } from "@mui/system";




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



export default function MessageCard({ item, i }) {
    return(
        <Card>
            <Nickname>
                { item.nickname } 
            </Nickname>
            <Date>
                { item.createdAt }
            </Date>
            <Content>
                { item.content }
            </Content>
        </Card>
    );
};