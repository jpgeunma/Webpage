import React from "react";
import { border, color, styled } from "@mui/system";
import { palette } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";

const SearchButtonArea = styled('div')({
    width: '60px',
    float: 'left',
});

const Button = styled('button')({
    width: '90px',
    height: '40px',
    borderRadius: '4px',
    color: '#ffffff',
    outline: 'none',
    border: 'none',
    ":hover": {
        width: '90px',
        height: '40px',
        borderRadius: '4px',
        backgroundColor: 'blue',
        color: '#ffffff',
        outline: 'none',
        border: 'none',
    },
    backgroundColor: 'blue',
});
    // &: hover {
    //     width: 90px;
    //     height: 40px;
    //     border-radius: 4px;
    //     background-color: ${ palette.blue[2] };
    //     color: #ffffff;
    //     outline: none;
    //     border: none;
    // }


export default function SearchButton (){
    return(
        <SearchButtonArea>
            <Button>
                검색
            </Button>
        </SearchButtonArea>
    );
};