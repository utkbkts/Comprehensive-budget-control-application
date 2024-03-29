import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Avatar, Badge, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoLogoEuro } from "react-icons/io";

import { LuListTodo } from "react-icons/lu";
import "../../styles/navbar.scss";
import { ContextProvider } from "../../context/Context";
import MobileSidebar from "../mobilesidebar/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../redux/state";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const { open, setOpen } = useContext(ContextProvider);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [navbarOpen, setnavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [mobileOpen]);
  return (
    <div className="navbar-container">
      <div className="content">
        <div className="wrapper-middle">
          <div className={`title ${open ? "active" : ""}`}>
            <h1>
              <IoLogoEuro className={`icon ${open ? "active" : ""}`} />
              {!open ? "Bütçe" : ""}
            </h1>
          </div>
          <div className="icon1" onClick={() => setOpen(!open)}>
            <FaBars size={25} />
          </div>
        </div>
        <div className="wrapper-left">
          <Space size="large">
            <Badge offset={[-4, 35]} color="#46c35f" dot={show}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Badge>
          </Space>
          <span className="user" onClick={() => setnavbarOpen(!navbarOpen)}>
            {user?.firstname} {user?.lastname}
            <span className="icon">
              {!navbarOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
            {navbarOpen && (
              <div className="logout" onClick={handleLogout}>
                <Button htmlType="submit">Logout</Button>
              </div>
            )}
          </span>
        </div>
        <div className="wrapper-right">
          <LuListTodo size={25} />
          <FaBars
            size={25}
            className="bars"
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </div>
      </div>
      {mobileOpen && (
        <MobileSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
    </div>
  );
};

export default Navbar;
