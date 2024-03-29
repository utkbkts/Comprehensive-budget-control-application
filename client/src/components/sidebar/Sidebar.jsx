import React, { useContext, useState } from "react";
import { Avatar, Badge, Space } from "antd";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";

import { CiUser } from "react-icons/ci";
import { IoHomeOutline, IoStatsChartOutline } from "react-icons/io5";
import "../../styles/sidebar.scss";
import { ContextProvider } from "../../context/Context";
import { Link, useLocation } from "react-router-dom";
import { AiTwotoneSnippets } from "react-icons/ai";
import { useSelector } from "react-redux";

const Sidebar = () => {
  //!badge kontrol
  const [show, setShow] = useState(true);
  //!hamburger bar
  const { open } = useContext(ContextProvider);
  //!router pathanme
  const pathname = useLocation().pathname;
  const user = useSelector((state) => state.user);
  return (
    <div className="sidebar-container">
      <div className="content">
        {!open ? <h1>Bütçe Kontrol Uygulaması</h1> : ""}
        <div className="wrapper">
          {!open ? (
            <ul>
              <li className="admin-panel">
                <Space size="large">
                  <Badge offset={[-4, 35]} color="#46c35f" dot={show}>
                    {user ? (
                      <Avatar
                        size="large"
                        src={`${
                          user?.updatedUser
                            ? `${
                                import.meta.env.VITE_REACT_APP_API
                              }/${user?.updatedUser?.profileImagePath.replace(
                                "public",
                                ""
                              )}`
                            : `${
                                import.meta.env.VITE_REACT_APP_API
                              }/${user?.profileImagePath.replace("public", "")}`
                        }`}
                      />
                    ) : (
                      <Avatar size="large" icon={<UserOutlined />} />
                    )}
                  </Badge>
                </Space>
                <div className="admin">
                  <span className="user">
                    {user?.firstname || user?.updatedUser?.firstname}{" "}
                    {user?.lastname || user?.updatedUser?.lastname?.slice(0, 1)}
                    .
                  </span>
                  <span className="admins">{user?.updatedUser?.bio}</span>
                </div>
              </li>
              <Link to={"/dashboard"}>
                <li className={`${pathname === "/dashboard" ? "active" : ""}`}>
                  Ana Sayfa <IoHomeOutline size={20} />
                </li>
              </Link>
              <Link to={"/profile"}>
                <li className={`${pathname === "/profile" ? "active" : ""}`}>
                  Profil <CiUser size={20} />
                </li>
              </Link>

              <Link to={"/product-add"}>
                <li
                  className={`${pathname === "/product-add" ? "active" : ""}`}
                >
                  Ürün Ekle <AppstoreAddOutlined size={20} />
                </li>
              </Link>
              <Link to={"/income"}>
                <li className={`${pathname === "/income" ? "active" : ""}`}>
                  Gelir Ayarları <AiTwotoneSnippets size={20} />
                </li>
              </Link>
              <Link to={"/expense"}>
                <li className={`${pathname === "/expense" ? "active" : ""}`}>
                  Gider Ayarları <IoStatsChartOutline size={20} />
                </li>
              </Link>
              <Link to={"/project-add"}>
                <li
                  className={`${pathname === "/project-add" ? "active" : ""}`}
                >
                  Proje Ayarları <GrProjects size={20} />
                </li>
              </Link>
            </ul>
          ) : (
            <div className="open-icon">
              <Link to={"/dashboard"}>
                <li className={`${pathname === "/dashboard" ? "active" : ""}`}>
                  <IoHomeOutline size={30} className="icon" />
                </li>
              </Link>
              <Link to={"/profile"}>
                <li className={`${pathname === "/profile" ? "active" : ""}`}>
                  <CiUser size={30} className="icon" />
                </li>
              </Link>

              <Link to={"/income"}>
                <li className={`${pathname === "/income" ? "active" : ""}`}>
                  <AiTwotoneSnippets size={30} className="icon" />
                </li>
              </Link>
              <Link to={"/expense"}>
                <li className={`${pathname === "/expense" ? "active" : ""}`}>
                  <IoStatsChartOutline size={30} className="icon" />
                </li>
              </Link>
              <Link to={"/product-add"}>
                <li
                  className={`${pathname === "/product-add" ? "active" : ""}`}
                >
                  <AppstoreAddOutlined
                    width={40}
                    className="icon"
                    style={{ fontSize: "30px" }}
                  />
                </li>
              </Link>
              <Link to={"/project-add"}>
                <li
                  className={`${pathname === "/project-add" ? "active" : ""}`}
                >
                  <GrProjects
                    width={40}
                    className="icon"
                    style={{ fontSize: "30px" }}
                  />
                </li>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
