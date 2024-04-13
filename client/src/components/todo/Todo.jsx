import { IoCloseSharp } from "react-icons/io5";
import "../../styles/todolist.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const Todo = ({ getLoginData }) => {
  const [form] = Form.useForm();
  const [todoGet, setTodoGet] = useState([]);
  const [Checked, setChecked] = useState(() => {
    const savedChecked = localStorage.getItem("checkedItems");
    return savedChecked ? JSON.parse(savedChecked) : {};
  });
  const creatorid = useSelector(
    (state) => state.user?.updatedUser?._id || state.user?._id
  );
  const user = useSelector((state) => state.user);
  //create todo
  const onFinish = async (values) => {
    const { title } = values;

    try {
      const todoCreate = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/todo`,
        { title, creator: creatorid }
      );
      const data = await todoCreate.data;
      if (data.success === true) {
        toast.success(data.message);
        setTodoGet([...todoGet, data.todo]);
        form.resetFields();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //delete
  const deleteRemove = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/todo/${id}`
      );

      if (response.status === 200) {
        toast.success("Yapılacak başarıyla silindi");
        setTodoGet((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        toast.error("Silinirken bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //get todo
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/todo`
      );
      setTodoGet(response.data);
    };
    data();
  }, [todoGet]);
  const filteredTodos = todoGet.filter(
    (item) => item.creator?._id === getLoginData?._id
  );

  //checked
  const handleCheckboxChange = (id) => {
    setChecked((prevChecked) => {
      const updatedChecked = {
        ...prevChecked,
        [id]: !prevChecked[id],
      };
      localStorage.setItem("checkedItems", JSON.stringify(updatedChecked));
      return updatedChecked;
    });
  };
  return (
    <>
      <h1>Yapılacaklar Listesi</h1>
      <div className="todocontainer">
        <div className="content-wrapper">
          <Form
            form={form}
            name="todos"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="content-b"
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Lütfen yapılacak giriniz!" }]}
            >
              <Input type="text" placeholder="Bugün Ne Yapacaksın ?" />
            </Form.Item>
            <Form.Item>
              <Button disabled={!user} type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
          {filteredTodos?.map((item) => (
            <div className="wrapper" key={item._id}>
              <div className="wrapper-left">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item._id)}
                  name="checkbox"
                />
                <span
                  style={{
                    textDecoration: Checked[item._id] ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </span>
              </div>
              <div className="wrapper-rights-todo">
                <IoCloseSharp
                  className="icon-todo"
                  size={20}
                  onClick={() => deleteRemove(item._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
