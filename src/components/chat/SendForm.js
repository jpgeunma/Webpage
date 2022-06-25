import React from "react";
import { styled } from "@mui/system";
import InputBar from "./InputBar"
import InputButton from "./InputButton"

const SendContainer = styled('div')({
    width: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    overflowX: 'auto',
    overflowY: 'hidden',
});

const StyledInputBar = styled('input')({
    width: '100%',
});

export default function SendForm() {
return (
    <SendContainer>
        <StyledInputBar placeholder="메시지를 입력해주세요" />
        <InputButton />            
    </SendContainer>
);
};