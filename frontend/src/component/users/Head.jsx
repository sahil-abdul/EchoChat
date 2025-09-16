import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/authSlice";

function Head() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    await authService.logout();
    dispatch(logOut());
    // navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-between p-2 border-b">
        <div className="font-bold">
          <ChatIcon /> EchoChat
        </div>
        <button onClick={Logout}>
          <LogoutIcon />
        </button>
        {/* <div><LogoutIcon/></div> */}
      </div>
    </>
  );
}

export default Head;
