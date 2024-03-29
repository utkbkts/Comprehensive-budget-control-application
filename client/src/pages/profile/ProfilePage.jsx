import React, { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../styles/home.scss";
import { ContextProvider } from "../../context/Context";
import Profile from "../../components/profile/Profile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { open } = useContext(ContextProvider);
  const user = useSelector((state) => state.user);

  return (
    <div className="home-container">
      <div className="content">
        <div
          className={`wrapper-lefts ${open ? "active" : ""}`}
          style={{ height: "100vh" }}
        >
          <Sidebar />
        </div>
        <div className="wrapper-rights">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
