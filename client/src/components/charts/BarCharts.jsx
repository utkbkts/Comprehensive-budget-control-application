import React from "react";
import Bar from "../barchart/Bar";

const BarCharts = ({ getLoginData }) => {
  // en çok alınan 4 ürün
  const highestFourProducts = getLoginData?.productList
    ?.sort((a, b) => parseFloat(b.productprice) - parseFloat(a.productprice))
    ?.slice(0, 4);

  return (
    <>
      <Bar highestFourProducts={highestFourProducts} />
    </>
  );
};

export default BarCharts;
