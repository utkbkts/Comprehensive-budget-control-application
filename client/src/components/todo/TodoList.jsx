import "../../styles/todolist.scss";
import { Button, Table } from "antd";
import moment from "moment";

const TodoList = ({ filteredTodos, onDelete }) => {
  const columns = [
    {
      title: "Proje İsmi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Başlanma Tarihi",
      dataIndex: "startdate",
      key: "startdate",
    },
    {
      title: "Bitirilmesi Gereken Tarih",
      dataIndex: "datefinish",
      key: "datefinish",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)} type="link">
          Sil
        </Button>
      ),
    },
  ];
  const data = {
    data: filteredTodos?.map((product) => ({
      key: product?._id,
      name: product?.projectname,
      startdate: moment(product?.projectstart).format("LL"),
      datefinish: moment(product?.projectend).format("LL"),
      description: product?.projectdesc,
    })),
  };

  const handleDelete = (key) => {
    onDelete(key);
  };
  return (
    <div>
      <h1>Yapılacak Projeler</h1>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data.data}
      />
    </div>
  );
};

export default TodoList;
