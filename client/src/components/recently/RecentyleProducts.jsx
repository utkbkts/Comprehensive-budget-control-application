import React from "react";
import "../../styles/recently.scss";
import moment from "moment";
const RecentyleProducts = ({ getLoginData }) => {
  //colors start
  const colors = {
    "kredi kartı": "linear-gradient(90deg, #f6e384, #ffd500)",
    nakit: "linear-gradient(89deg, #5e7188, #3e4b5b)",
  };
  //colors finish
  return (
    <div className="recent-container">
      <div className="content-product-list">
        <h1>En Son Eklenen Ürünler</h1>
        {getLoginData?.productList?.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {getLoginData?.productList?.map((item) => (
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
