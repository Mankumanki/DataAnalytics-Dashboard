import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { ExcelContextProvider } from "./Hooks/useExcelContext";
import PageLoad from "./LoadingState/PageLoad";

const DataSetPage = lazy(() => import("./Page/DataSetPage"));
const MainBoardPage = lazy(() => import("./Page/MainBoardPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ExcelContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoad />}>
                  <MainBoardPage />
                </Suspense>
              }
            />
            <Route
              path="/dataset"
              element={
                <Suspense fallback={<PageLoad />}>
                  <DataSetPage />
                </Suspense>
              }
            />
          </Routes>
        </ExcelContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
