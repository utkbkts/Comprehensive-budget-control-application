import React, { useEffect, useState } from "react";
import "../../styles/recently.scss";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
const RecentyleProducts = ({ getLoginData }) => {
  //colors start
  const colors = {
    "kredi kartı": "linear-gradient(90deg, #f6e384, #ffd500)",
    nakit: "linear-gradient(89deg, #5e7188, #3e4b5b)",
  };
  //colors finish
  const [projectGet, setProjectGet] = useState([]);

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/product/${id}`
      );

      if (response.status === 200) {
        toast.success("Ürün başarıyla silindi");
        setProjectGet((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== id)
        );
      } else {
        toast.error("Silinirken bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/product/get`
      );
      setProjectGet(response.data);
    };
    data();
  }, []);
  const filteredTodos = projectGet.filter(
    (item) => item.creator._id === getLoginData._id
  );
  return (
    <div className="recent-container">
      <div className="content-product-list">
        <h1>En Son Eklenen Ürünler</h1>
        {filteredTodos?.length === 0 ? (
          <h2>Henüz veri eklenmedi</h2>
        ) : (
          <div
            className="wrapper"
            style={{ overflowY: "scroll", maxHeight: "400px" }}
          >
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Ürün İçeriği</th>
                    <th>Ödeme Şekli</th>
                    <th>Alınma Tarihi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos?.map((item) => (
                    <tr>
                      <td className="image">
                        <img src={item?.productImage?.url} alt="logo" />{" "}
                        <p>{item?.productname}</p>
                      </td>
                      <td>{item?.productdesc}</td>
                      <td className="status">
                        <label
                          htmlFor=""
                          style={{
                            background: colors[item.paymentmethod],
                          }}
                        >
                          {item.paymentmethod}
                        </label>
                      </td>
                      <td>{moment(item?.createdAt).format("LL")}</td>
                      <td
                        className="delete"
                        onClick={() => handleRemove(item?._id)}
                      >
                        <label htmlFor="">Sil</label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentyleProducts;
