import { createContext, useContext, useState } from "react";

const ExcelContext = createContext();

function useExcelContext() {
  return useContext(ExcelContext);
}

function ExcelContextProvider({ children }) {
  const [xData, setXData] = useState([]);
  return (
    <ExcelContext.Provider value={{ xData, setXData }}>
      {children}
    </ExcelContext.Provider>
  );
}

export { useExcelContext, ExcelContextProvider };
