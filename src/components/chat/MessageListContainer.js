import React from "react";
import { styled } from "@mui/system";
import SearchBar from "./InputBar"
import SearchButton from "./InputButton"
import MessageCard from "./MessageCard"


const Wrap = styled('div')({
    float: 'left',
    width: '30%',
    height: '600px',
    overflowX: 'hidden',
    overflowY: 'auto',
});


const Header = styled('div')({
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '1.5rem',
});

const ListBox = styled('div')({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
    width: '100%',
});



export default function MessageListContainer() {
const dummyData = [
    { "nickname": "test-01", "createdAt": "2020-01-01", "content": "test-01" },
    { "nickname": "test-02", "createdAt": "2020-01-01", "content": "test-02" },
    { "nickname": "test-03", "createdAt": "2020-01-01", "content": "test-03" },
    { "nickname": "test-04", "createdAt": "2020-01-01", "content": "test-04" },
    { "nickname": "test-05", "createdAt": "2020-01-01", "content": "test-05" },
    { "nickname": "test-05", "createdAt": "2020-01-01", "content": "test-05" },
    { "nickname": "test-05", "createdAt": "2020-01-01", "content": "test-05" },
    { "nickname": "test-05", "createdAt": "2020-01-01", "content": "test-05" },
];

return(
    <Wrap>
        <Header>
            <SearchBar placeholder="닉네임을 입력해주세요" />
            <SearchButton />            
        </Header>
        <ListBox>
            {
                dummyData.map((item, i) => {
                    return <MessageCard item={ item } 
                                        i={ i }
                           />
                })
            }
        </ListBox>
    </Wrap>
);
};
