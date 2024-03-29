import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/4957136.jpg";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false);

  const onFinish = async (values) => {
    try {
      const { firstname, lastname, email, password, profileImage } = values;
      setLoadings(true);
      const registerForm = new FormData();
      registerForm.append("firstname", firstname);
      registerForm.append("lastname", lastname);
      registerForm.append("email", email);
      registerForm.append("password", password);
      registerForm.append("profileImage", profileImage.file);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/register`,
        registerForm
      );

      const data = response.data;
      if (data.success === true) {
        toast.success(data.message);
        setTimeout(() => {
          setLoadings(false);
          navigate("/login");
        }, 2000);
      } else {
        setLoadings(false);

        toast.error(data.message);
      }
    } catch (error) {
      setLoadings(false);

      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register">
      <div className="background">
        <img src={img} alt="imagepic" />
        <div className="overlay"></div>
      </div>
      <Form
        className="form"
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <h1>Üyelik Sayfası</h1>
        <div className="register-wrapper">
          <Form.Item
            label="İsim"
            name="firstname"
            rules={[{ required: true, message: "Lütfen isminizi giriniz!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Soy isim"
            name="lastname"
            rules={[
              { required: true, message: "Lütfet soy isminizi giriniz!" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Lütfen email hesabınızı giriniz!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Parola"
          name="password"
          rules={[{ required: true, message: "Lütfen parolanızı giriniz!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="profileImage"
          label="Profil Resmi"
          valuePropName="profileImage"
          rules={[{ required: true, message: "Lütfen resim yükleyiniz" }]}
        >
          <Upload
            name="profileImage"
            action={`${import.meta.env.VITE_REACT_APP_API}/auth/register`}
            listType="picture"
            beforeUpload={() => false} // Resmi hemen yükleme
          >
            <Button icon={<UploadOutlined />}>Profil resmi yükle</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          {loadings ? (
            <Button type="primary" loading>
              Yükleniyor
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Üye ol
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Hesabın var mı ? <Link to="/login">Giriş Yap</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
