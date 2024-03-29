import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import "../../styles/profile.scss";
import { Avatar, Badge, Button, Space } from "antd";
import { Input } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/tr";
import toast from "react-hot-toast";
import { updateUser } from "../../../redux/state";
import { useDispatch } from "react-redux";
import FileUpload from "../upload/File";

const Profile = ({ user }) => {
  const [firstname, setFirstname] = useState(
    user?.firstname || user?.updatedUser.firstname || ""
  );
  const [lastname, setLastname] = useState(
    user?.lastname || user?.updatedUser.lastname || ""
  );
  const [bio, setBio] = useState(user?.bio || user?.updatedUser?.bio || "");
  const dispatch = useDispatch();
  //update profile start
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      firstname,
      lastname,
      bio,
      profileImage:
        user?.updatedUser?.profileImagePath || user?.profileImagePath,
    };
    const types = user?.updatedUser?._id || user?._id;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/user/update/${types}`,
        updatedUser
      );
      const data = await response.data;
      if (data.success === true) {
        toast.success(data.message);
        dispatch(updateUser({ user: data }));
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating user:", error);
    }
  };
  //update profile finish
  return (
    <div className="container-profile">
      <div className="content-profile">
        <span className="wrapper-profile">
          <button className="icon-profile">
            <AiOutlineUser size={20} />
          </button>
          <span className="title-profile">Profil</span>
          <span>
            Üyelik Tarihi {moment(user?.createdAt).format("LL")} <br />
            Son Güncelleme Tarihi {moment(user?.updatedAt).format("LL")}
          </span>
        </span>
        <div className="form-wrapper">
          <div className="form-content">
            <FileUpload user={user} />
          </div>
          <div className="form-group">
            <form onSubmit={handleUpdate}>
              <Input
                value={firstname || user?.firstname || ""}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Input
                value={lastname || user?.lastname || ""}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={user?.lastname}
              />
              <Input
                placeholder={user?.email || user?.updatedUser?.email}
                disabled
              />

              <Input
                value={bio || user?.bio || user?.updatedUser?.bio || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 30) {
                    setBio(e.target.value);
                  }
                }}
                placeholder={user?.bio || user?.updatedUser?.bio}
                count={{
                  show: true,
                  max: 30,
                }}
              />
              <Button htmlType="submit">Güncelle</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
