import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useRef, useState } from "react";
import "../../styles/productsadd.scss";
import axios from "axios";
import UploadFile from "../uploadproduct/ProductImage";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/state";
import { InputNumber } from "antd";

const options = [
  {
    value: "nakit",
    label: "Nakit",
  },
  {
    value: "kredi kartı",
    label: "Kredi Kartı",
  },
];

const ProductAdd = () => {
  const [photos, setPhotos] = useState([]);
  const [form] = Form.useForm();
  const creatorid = useSelector(
    (state) => state.user?.updatedUser?._id || state.user?._id
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //image start
  // const [productImage, setproductImage] = useState(null);
  // const ref = useRef(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setproductImage(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const handleAvatarClick = () => {
  //   ref.current.click();
  // };
  //imagefinish
  const onFinish = async (values) => {
    const { paymentmethod, productdesc, productname, productprice } = values;
    const formData = new FormData();

    formData.append("productname", productname);
    formData.append("creator", creatorid);
    formData.append("productdesc", productdesc);
    formData.append("productprice", productprice);
    formData.append("paymentmethod", paymentmethod);
    photos.forEach((photo) => {
      formData.append("productImage", photo);
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/product/add`,
        formData
      );
      const data = await response.data;
      if (data.success === true) {
        toast.success(data.message);
        dispatch(
          setProducts({
            productList: data.updatedUser,
          })
        );
        form.resetFields();
        setPhotos([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const formattedNumber = (value) => {
    if (!value) return "";

    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return parts.join(".");
  };
  return (
    <div className="container-product">
      <div className="content-product">
        <span className="wrapper-product">
          <button className="icon-product">
            <IoIosAddCircleOutline size={20} />
          </button>
          <span className="title-product">Ürün</span>
        </span>
        <div className="form-product-wrapper">
          <Form
            form={form}
            name="productadd"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="form-product"
          >
            <Form.Item
              name="productname"
              rules={[
                { required: true, message: "Lütfen ürün ismini giriniz!" },
              ]}
            >
              <Input type="text" placeholder="Ürün ismi" />
            </Form.Item>
            <Form.Item
              name="productprice"
              rules={[
                { required: true, message: "Lütfen ürün fiyatını giriniz!" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={formattedNumber}
                parser={(value) => value.replace(/\./g, "")}
                type="text"
                placeholder="Ürün fiyatı"
              />
            </Form.Item>
            <Form.Item
              name="productdesc"
              rules={[
                {
                  required: true,
                  message: "Lütfen ürün açıklamasını giriniz!",
                },
              ]}
            >
              <TextArea
                rows={6}
                type="text"
                placeholder="Ürün Açıklaması örneğin:ürünü 23.12.2024 tarihinde 'utku' marketten aldım."
              />
            </Form.Item>
            <div className="upload">
              <UploadFile photos={photos} setPhotos={setPhotos} />
            </div>
            <Form.Item
              name={"paymentmethod"}
              rules={[
                {
                  required: true,
                  message: "Lütfen ödeme şeklini giriniz!",
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Ödeme Şekli Seç"
              >
                {options.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Ürünü Ekle
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
