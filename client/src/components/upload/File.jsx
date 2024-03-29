import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { ContextProvider } from "../../context/Context";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const FileUpload = ({ user }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { fileList, setFileList } = useContext(ContextProvider);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    let previewImageUrl =
      user?.profileImagePath || user?.updatedUser?.profileImagePath || "";
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (file.preview) {
      previewImageUrl = file.preview;
    }
    setPreviewImage(previewImageUrl);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        action={`${import.meta.env.VITE_REACT_APP_API}/user/upload/${
          user?._id || user?.updatedUser._id
        }`}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length < 0 ? (
          uploadButton
        ) : (
          <img
            style={{ borderRadius: "50%", width: "100%", height: "100%" }}
            src={`${
              user?.updatedUser
                ? `${
                    import.meta.env.VITE_REACT_APP_API
                  }/${user?.updatedUser?.profileImagePath.replace(
                    "public",
                    ""
                  )}`
                : `${
                    import.meta.env.VITE_REACT_APP_API
                  }/${user?.profileImagePath.replace("public", "")}`
            }`}
            alt="Resim"
          />
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default FileUpload;
