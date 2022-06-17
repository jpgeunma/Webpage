import React, {useEffect, useState} from "react";


import {useNavigate} from "react-router"

function CreateGroupComponent(){
    
    const history = useNavigate();
    const [groupName, setGroupName] = useState("");
    
    useEffect(() => {
        document.title = "Create group"
    }, []); // [] 는 첫 렌더링에서만 로딩한다

    function handleChange(event) {
        setGroupName(event.target.value);
    }

    function createGroup(event) {
        if (groupName !== "") {
        }
    }

    return (
        <dev>

        </dev>
    )
};

export default CreateGroupComponent;