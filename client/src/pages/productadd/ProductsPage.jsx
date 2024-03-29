import React, { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../styles/home.scss";
import { ContextProvider } from "../../context/Context";
import ProductAdd from "../../components/products-add/ProductAdd";

const ProductsPage = () => {
  const { open } = useContext(ContextProvider);

  return (
    <div className="home-container">
      <div className="content">
        <div
          className={`wrapper-lefts ${open ? "active" : ""}`}
          style={{ height: "100vh" }}
        >
          <Sidebar />
        </div>
        <div className="wrapper-rights">
          <ProductAdd />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
