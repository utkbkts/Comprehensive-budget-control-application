import React, { useState } from "react";
import "../../styles/mobile.scss";
import { Avatar, Badge, Space } from "antd";
import { CiUser } from "react-icons/ci";
import { IoHomeOutline, IoStatsChartOutline } from "react-icons/io5";
import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AiTwotoneSnippets } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
const MobileSidebar = () => {
  const [show, setShow] = useState(true);
  const pathname = useLocation().pathname;

  return (
    <div className="mobile-sidebar">
      <div className="content">
        <div className="admin-panel">
          <Space size="large">
            <Badge offset={[-4, 35]} color="#46c35f" dot={show}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Badge>
          </Space>
          <div className="admin">
            <span className="user">utku toygun bektasoglu</span>
            <span className="admins">ADMIN</span>
          </div>
        </div>
        <ul>
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
            <li className={`${pathname === "/product-add" ? "active" : ""}`}>
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
            <li className={`${pathname === "/project-add" ? "active" : ""}`}>
              Proje Ayarları <GrProjects size={20} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
