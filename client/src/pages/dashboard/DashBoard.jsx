import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import "../../styles/dashboard.scss";
import Products from "../../components/products/Products";
import { FallOutlined, RiseOutlined, StockOutlined } from "@ant-design/icons";
import BartCharts from "../../components/charts/BarCharts";
import SimpleBarChars from "../../components/charts/SimpleBarChars";
import RecentyleProducts from "../../components/recently/RecentyleProducts";
import TodoList from "../../components/todo/TodoList";
import Todo from "../../components/todo/Todo";
import axios from "axios";
import toast from "react-hot-toast";
const DashBoard = ({ getLoginData }) => {
  //!gelir
  const allincomeTotal = Object.values(getLoginData?.incomeList || {}).reduce(
    (total, income) => {
      for (const key in income) {
        if (
          key !== "createdAt" &&
          key !== "_id" &&
          key !== "updatedAt" &&
          key !== "__v" &&
          key !== "creator"
        ) {
          const numericValue = parseFloat(
            income[key].replace(".", "").replace(",", ".")
          );
          if (!isNaN(numericValue)) {
            total += numericValue;
          }
        }
      }
      return total;
    },
    0
  );
  // Gelir verilerini aylara göre gruplama

  const groupIncomeByMonth = (incomeData) => {
    return incomeData.reduce((acc, income) => {
      const date = new Date(income.createdAt);
      const month = date.getMonth();
      acc[month] = (acc[month] || 0) + parseFloat(income.income);
      return acc;
    }, {});
  };

  // Aylara göre gruplanmış gelir verileri
  const groupedIncome = getLoginData?.incomeList
    ? groupIncomeByMonth(getLoginData.incomeList)
    : {};
  // Geçen ayın toplam gelirini ve artışını/azalışını kontrol etme
  const currentMonth = new Date().getMonth();
  const lastMonthTotalIncome = groupedIncome[currentMonth - 1] || 0;
  const currentMonthTotalIncome = groupedIncome[currentMonth] || 0;
  const percentageChange =
    lastMonthTotalIncome !== 0
      ? ((currentMonthTotalIncome - lastMonthTotalIncome) /
          lastMonthTotalIncome) *
        100
      : currentMonthTotalIncome !== 0
      ? 100
      : 0;

  // Mesaj oluşturma
  let message = "";
  if (percentageChange > 0) {
    message = `Geçen aydan %${Math.abs(
      percentageChange
    )} fazla gelir elde edildi`;
  } else if (percentageChange < 0) {
    message = `Geçen aydan %${Math.abs(percentageChange)} az gelir elde edildi`;
  } else {
    message = "Geçen ay ile aynı gelir elde edildi";
  }
  //!gelir finish
  //!gider start
  const allExpensesTotal = Object.values(
    getLoginData?.expenseList || {}
  ).reduce((total, expense) => {
    for (const key in expense) {
      if (
        key !== "createdAt" &&
        key !== "_id" &&
        key !== "updatedAt" &&
        key !== "__v"
      ) {
        const numericValue = parseFloat(
          expense[key].replace(".", "").replace(",", ".")
        );
        if (!isNaN(numericValue)) {
          total += numericValue;
        }
      }
    }
    return total;
  }, 0);

  // console.log(allExpensesTotal.toLocaleString("tr-TR"));

  const groupExpenseByMonth = (expenseData) => {
    return expenseData.reduce((acc, expense) => {
      const date = new Date(expense.createdAt);

      const month = date.getMonth() + 1;

      acc[month] = (acc[month] || 0) + parseFloat(expense.createdAt);
      return acc;
    }, {});
  };
  const groupedExpense = getLoginData?.expenseList
    ? groupExpenseByMonth(getLoginData.expenseList)
    : {};

  const currentMonths = new Date().getMonth();
  const lastMonthTotalExpense = groupedExpense[currentMonths - 1] || 0;
  const currentMonthTotalExpense = groupedExpense[currentMonths] || 0;
  const percentageChanges =
    lastMonthTotalIncome !== 0
      ? ((currentMonthTotalExpense - lastMonthTotalExpense) /
          lastMonthTotalExpense) *
        100
      : currentMonthTotalExpense !== 0
      ? 100
      : 0;

  let messages = "";
  if (percentageChanges > 0) {
    messages = `Geçen aydan %${Math.abs(percentageChanges)} fazla gider oldu`;
  } else if (percentageChanges < 0) {
    messages = `Geçen aydan %${Math.abs(
      percentageChanges
    )} az gider elde edildi`;
  } else {
    messages = "Geçen ay ile aynı gider elde edildi";
  }

  //en çok alınan ürün
  const highestPriceProduct = getLoginData?.productList?.reduce(
    (highest, item) => {
      const itemPrice = parseFloat(item.productprice);
      return itemPrice > highest.price
        ? { product: item, price: itemPrice }
        : highest;
    },
    { product: null, price: 0 }
  );
  const formattedNumber = new Intl.NumberFormat("tr-TR").format;
  //todolist

  const [project, setProjectGet] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/project`
      );
      setProjectGet(response.data);
    };
    data();
  }, [project]);
  const filteredTodos = project.filter(
    (item) => item.creator?._id === getLoginData?._id
  );

  //!delete project
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/project/${id}`
      );

      if (response.status === 200) {
        toast.success("Proje başarıyla silindi");
        setProjectGet((prevTodos) =>
          prevTodos.filter((proje) => proje._id !== id)
        );
      } else {
        toast.error("Silinirken bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <span className="wrapper">
          <button className="icon">
            <AiOutlineHome size={20} />
          </button>
          <span className="title">Ana Sayfa</span>
        </span>
        <div className="products">
          <Products
            index={1}
            title="Toplam Gelir"
            content={formattedNumber(allincomeTotal)}
            icon={<RiseOutlined />}
            paragraph={message}
          />
          <Products
            index={2}
            title="Toplam Gider"
            content={allExpensesTotal?.toLocaleString("tr-TR")}
            icon={<FallOutlined />}
            paragraph={messages}
          />
          <Products
            index={3}
            title="En Çok Harcanan ürün"
            content={highestPriceProduct?.product?.productname}
            price={highestPriceProduct?.product?.productprice}
            icon={<StockOutlined />}
          />
        </div>
        <div className="charts">
          <BartCharts getLoginData={getLoginData} />
          {/* <SimpleBarChars /> */}
        </div>
        <div className="recently">
          <RecentyleProducts getLoginData={getLoginData} />
        </div>
        <div className="todolist">
          <div className="t-1">
            <TodoList filteredTodos={filteredTodos} onDelete={handleDelete} />
          </div>
          <div className="t-2">
            <Todo getLoginData={getLoginData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
