import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { ContextProvider } from "../../context/Context";
import "../../styles/home.scss";
import DashBoard from "../dashboard/DashBoard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../redux/state";
const Homepage = () => {
  const { open } = useContext(ContextProvider);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { getLoginData, setgetLoginData } = useContext(ContextProvider);
  const user = useSelector((state) => state.user);
  const filterUser = user?.updatedUser?._id || user?._id;
  const matchedUser = userData?.find((item) => item?._id === filterUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (matchedUser) {
      setgetLoginData(matchedUser);
    } else {
      console.log("Eşleşen kullanıcı bulunamadı");
    }
  }, [matchedUser]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/user`
      );

      setUserData(response.data.user);
    };
    fetchData();
  }, []);
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="home-container">
      <div className="content">
        <div className={`wrapper-lefts ${open ? "active" : ""}`}>
          <Sidebar />
        </div>
        <div className="wrapper-rights">
          <DashBoard getLoginData={getLoginData} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
