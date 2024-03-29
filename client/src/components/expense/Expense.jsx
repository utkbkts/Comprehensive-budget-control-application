import React, { useState } from "react";
import { Button, Input } from "antd";
import { IoStatsChartOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setExpense } from "../../../redux/state";
const initialState = {
  invoice: "",
  rent: "",
  transport: "",
  shopping: "",
  entertainment: "",
  health: "",
  education: "",
  travel: "",
  alcohol: "",
  homecare: "",
};

const Expense = () => {
  const [form, setForm] = useState(initialState);
  const creatorid = useSelector(
    (state) => state.user?.updatedUser?._id || state.user?._id
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/\D/g, "");
    const formattedNumber = Number(formattedValue).toLocaleString("tr-TR");
    setForm((prevForm) => ({
      ...prevForm,
      [name]: formattedNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/expense/add`,
        { ...form, creator: creatorid }
      );
      const data = await response.data;
      if (data.success === true) {
        toast.success(data.message);
        dispatch(
          setExpense({
            expenseList: data.data,
          })
        );
        setForm("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-income">
      <div className="content-income">
        <span className="wrapper-income">
          <button className="icon-income">
            <IoStatsChartOutline size={20} />
          </button>
          <span className="title-income">Gider</span>
        </span>
        <div className="income-form-expense">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Fatura Giderleri"
              name="invoice"
              value={form.invoice}
              required
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Kira Gideri"
              required
              name="rent"
              value={form.rent}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Ulaşım Giderleri"
              required
              name="transport"
              value={form.transport}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Alışveriş Giderleri"
              required
              name="shopping"
              value={form.shopping}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Eğlence ve Hobi Giderleri"
              required
              name="entertainment"
              value={form.entertainment}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Sağlık Giderleri"
              required
              name="health"
              value={form.health}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Eğitim Giderleri"
              required
              name="education"
              value={form.education}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Seyahat Giderleri"
              name="travel"
              required
              value={form.travel}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Sigara ve Alkol Giderleri"
              name="alcohol"
              required
              value={form.alcohol}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Ev Bakım ve Onarım Giderleri"
              required
              name="homecare"
              value={form.homecare}
              onChange={handleChange}
            />
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Expense;
