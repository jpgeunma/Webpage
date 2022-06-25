import React from "react";
import { styled } from "@mui/system";
import ChatCard from "./ChatCard"


const Wrap = styled('div')({
    width: '100%',
    height: '560px',

});

export default function RoomTemplate(){
return(
    <Wrap>
        <ChatCard />
    </Wrap>
);
};