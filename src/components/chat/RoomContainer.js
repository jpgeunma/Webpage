import React from "react";
import { styled } from "@mui/system";
import RoomTemplate from "./RoomTemplate"
import SendForm from "./SendForm"

const Wrap = styled('div')({
    paddingTop: '50px',
    width: '70%',
    height: '600px',
    overflowX: 'hidden',
    overflowY: 'auto',
});

export default function RoomContainer(){
return(
    <Wrap>
        <RoomTemplate />
        <SendForm />
    </Wrap>
);
};