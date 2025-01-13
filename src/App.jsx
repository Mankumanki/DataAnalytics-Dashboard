import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import { ExcelContextProvider } from "./Hooks/useExcelContext";

const DataSetPage = lazy(() => import("./Page/DataSetPage"));
const MainBoardPage = lazy(() => import("./Page/MainBoardPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ExcelContextProvider>
          <Routes>
            <Route path="/" element={<MainBoardPage />} />
            <Route path="/dataset" element={<DataSetPage />} />
          </Routes>
        </ExcelContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
