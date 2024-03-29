import React from "react";
import "../../styles/charts.scss";
import { Pie } from "@ant-design/plots";

const Bar = ({ highestFourProducts }) => {
  const formattedNumber = new Intl.NumberFormat("tr-TR").format;
  const config = {
    data: highestFourProducts?.map((product) => ({
      type: product?.productname,
      value: parseFloat(product?.productprice.toLocaleString("tr-TR")),
    })),
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <div className="chart">
      <h1>Bu ay en çok alınan 4 ürün</h1>
      {highestFourProducts?.length === 0 ? (
        <h2>veri eklenmedi</h2>
      ) : (
        <Pie {...config} />
      )}
    </div>
  );
};

export default Bar;
