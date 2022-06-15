import React, {useEffect, useState} from "react";


import {useHistory} from "react-router-dom"

export default CreateGroupContainer = () => {
    
    const history = useHistory();
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

    )
}