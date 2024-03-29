import { createContext, useState } from "react";
export const ContextProvider = createContext(null);

export const StateContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [getLoginData, setgetLoginData] = useState([]);
  return (
    <ContextProvider.Provider
      value={{
        open,
        setOpen,
        fileList,
        setFileList,
        getLoginData,
        setgetLoginData,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
