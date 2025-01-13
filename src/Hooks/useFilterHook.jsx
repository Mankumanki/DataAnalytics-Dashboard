import { useMemo } from "react";
import { useExcelContext } from "./useExcelContext";

function useFilterHook(key) {
  const ExcelContext = useExcelContext();
  const header = ExcelContext?.xData[0];

  return useMemo(() => {
    const len = ExcelContext?.xData.length - 1;
    const xData = ExcelContext?.xData.slice(1, len + 1);
    const obj = {};
    obj.totalData = len;

    const setMap = new Set();
    header?.forEach((val, idx) => {
      if (key == val) {
        xData.forEach((val) => {
          setMap.add(val[idx]);
        });
        return;
      }
    });

    obj[key] = setMap.size;
    return obj;
  }, [ExcelContext?.xData, key]);
}

export default useFilterHook;
