import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/userSlice";

export default function Topbar() {
  const admin = useSelector(state => state.user.curUser);
  const history = useHistory();
  const dispatch = useDispatch();

  //console.log(admin)
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    history.push('/login');
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">JackLaneAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>

          <div className="avatarWrap">
            <img src={admin.avatar} alt="" className="topAvatar" />
            <div className="dropdown">
              <p
                onClick={handleLogout}
                className="logout"
              >Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
