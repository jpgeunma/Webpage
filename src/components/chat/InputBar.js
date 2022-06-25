import React from "react";
import { styled } from "@mui/system";
import Input from "./CommonInput";

const SearchBarArea = styled('div')({
    float: 'left',
    width: 'inherit',
});


export default function SearchBar({placeholder})
{
    return(
        <SearchBarArea>
            <Input name="searchBar"
                   type="text"
                   placeholder={ placeholder }
            />
        </SearchBarArea>
    );
};