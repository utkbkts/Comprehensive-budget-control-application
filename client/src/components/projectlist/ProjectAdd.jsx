import React, { useContext, useEffect, useState } from "react";
import "../../styles/projectadd.scss";
import { Button, Form, Input } from "antd";
import { GrProjects } from "react-icons/gr";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ContextProvider } from "../../context/Context";
const ProjectAdd = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { projectname, projectstart, projectend, projectdesc } = values;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/project`,
        {
          projectname,
          creator: creatorid,
          projectstart,
          projectend,
          projectdesc,
        }
      );
      const data = response.data;
      if (data.success === true) {
        toast.success("Ürün başarılı bir şekilde eklendi");
        form.resetFields();
      } else {
        toast.error("ürün eklenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="project-container">
      <div className="content-project">
        <span className="wrapper-project">
          <button className="icon-project">
            <GrProjects size={20} />
          </button>
          <span className="title-project">Proje</span>
        </span>
        <div className="form-product-wrapper">
          <Form
            form={form}
            name="projectadd"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="form-product"
          >
            <Form.Item
              name="projectname"
              rules={[
                { required: true, message: "Lütfen proje ismini giriniz!" },
              ]}
            >
              <Input type="text" placeholder="Proje ismi" />
            </Form.Item>
            <Form.Item
              label="Proje başlangıç tarihi"
              name="projectstart"
              rules={[
                { required: true, message: "Lütfen proje tarihini giriniz!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Proje bitiş tarihi"
              name="projectend"
              rules={[
                { required: true, message: "Lütfen proje tarihini giriniz!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="projectdesc"
              rules={[
                {
                  required: true,
                  message: "Lütfen proje açıklamasını giriniz!",
                },
              ]}
            >
              <Input type="text" placeholder="Proje Açıklaması" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdd;
