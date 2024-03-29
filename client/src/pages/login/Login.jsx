import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/4957136.jpg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/state";
const Login = () => {
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      setLoadings(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/login`,
        { email: values.email, password: values.password }
      );

      const data = await response.data;
      if (data.success === true) {
        toast.success(data.message);
        dispatch(
          setLogin({
            token: data.token,
            user: data.user,
          })
        );
        setTimeout(() => {
          setLoadings(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoadings(false);

        toast.error(data.message);
      }
    } catch (error) {
      setLoadings(false);
      toast.error("Böyle Bir kullanıcı bulunumadı");
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
        <h1>Giriş Sayfası</h1>

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

        <Form.Item>
          {loadings ? (
            <Button type="primary" loading>
              Yükleniyor
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Hesabın yok mu ? <Link to="/register">Üye ol</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
