import React from "react";
import "../../styles/products.scss";
const Products = ({ index, title, content, icon, paragraph, price }) => {
  //!colors start
  const colors = [
    "linear-gradient(90deg, #ffbf96, #fe7096)",
    "linear-gradient(90deg, #90caf9, #047edf 99%)",
    "linear-gradient(90deg, #84d9d2, #07cdae)",
  ];
  const backgroundColor = colors[index % colors.length];
  //!colors finish
  const formattedNumber = new Intl.NumberFormat("tr-TR").format;

  return (
    <div className="products-container" style={{ background: backgroundColor }}>
      <div className="wrapper">
        <div className="title">
          <div className="title-wrapper">
            <h1>{title}</h1>
            <span>{icon}</span>
          </div>
          <div>
            <p>{content}</p>
            <p className="title-paragpraf">
              {price && formattedNumber(price)}
              {price && "₺"}
            </p>
          </div>
        </div>
        <div className="paragraph">
          <span>{paragraph}</span>
        </div>
      </div>
    </div>
  );
};

export default Products;
