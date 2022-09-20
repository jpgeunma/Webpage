import React from "react";
import basestyle from "../../style/Login.css";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router";
const Profile = ({ setUserState, username }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = (event) =>{
    console.log(cookies.get('token'));
    cookies.remove('token',{path: '/'});
    cookies.remove('email',{path: '/'});
    navigate("/");
  }

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <button
        className={basestyle.button_common}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default Profile;