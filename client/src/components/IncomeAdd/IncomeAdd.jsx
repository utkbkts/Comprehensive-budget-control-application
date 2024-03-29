import React, { useState } from "react";
import "../../styles/incomeadd.scss";
import { AiTwotoneSnippets } from "react-icons/ai";
import { Button, Input } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIncome } from "../../../redux/state";
const IncomeAdd = () => {
  const [income, setIncomeData] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const creatorid = useSelector(
    (state) => state.user?.updatedUser?._id || state.user?._id
  );

  //!sayı formatlamak start
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = Number(value).toLocaleString("tr-TR");

    setIncomeData(formattedValue);
  };
  //!sayı formatlamak finish

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API}/income/add`,
      { income, creator: creatorid }
    );
    const data = await response.data;
    if (data.success === true) {
      toast.success(data.message);
      dispatch(
        setIncome({
          incomeList: data.data,
        })
      );
      setIncomeData("");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="container-income">
      <div className="content-income">
        <span className="wrapper-income">
          <button className="icon-income">
            <AiTwotoneSnippets size={20} />
          </button>
          <span className="title-income">Gelir</span>
        </span>
        <div className="income-form">
          <form onSubmit={handleSubmit} action="">
            <Input
              type="text"
              value={income}
              onChange={handleInputChange}
              placeholder="Gelirini gir"
              name="gelir"
              required
            />
            <Button htmlType="submit" type="primary">
              Kaydet
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncomeAdd;
