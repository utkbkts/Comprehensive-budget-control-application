import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/charts.scss";

const data = [
  {
    name: "ocak",
    gelir: 4000,
    gider: 2400,
    amt: 2400,
  },
  {
    name: "şubat",
    gelir: 3000,
    gider: 1398,
    amt: 2210,
  },
  {
    name: "mart",
    gelir: 2000,
    gider: 9800,
    amt: 2290,
  },
  {
    name: "nisan",
    gelir: 2780,
    gider: 3908,
    amt: 2000,
  },
  {
    name: "mayıs",
    gelir: 1890,
    gider: 4800,
    amt: 2181,
  },
  {
    name: "haziran",
    gelir: 2390,
    gider: 3800,
    amt: 2500,
  },
  {
    name: "temmuz",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
  {
    name: "ağustos",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
  {
    name: "eylül",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
  {
    name: "ekim",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
  {
    name: "kasım",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
  {
    name: "aralık",
    gelir: 3490,
    gider: 4300,
    amt: 2100,
  },
];

const SimpleBarChart = () => {
  return (
    <div className="chart">
      <h1>Gelir ve Gider Tablosu</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="gelir"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="gider"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
