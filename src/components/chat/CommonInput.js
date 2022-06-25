import React from "react";
import { styled } from "@mui/system";
import { palette } from "@mui/system";


const StyledInput = styled('input')({
    width: '100%',
    height: '40px',
    border: '2px solid #aaa',
    borderRadius: '4px',
    margin: '8px 0',
    outline: 'none',
    padding: '8px',
    boxSizing: 'border-box',
    transition: '.3s',
    ":focus":{
        borderColor: 'blue',
        boxShadow: '0 0 8px 0',
    }
})

export default function Input(props) {
    return (
        <StyledInput {...props}/>
    )
}