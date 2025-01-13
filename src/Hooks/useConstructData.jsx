import { useMemo } from "react";
import { useExcelContext } from "./useExcelContext";

function useConstructData(key, dataLimit) {
  const ExcelContext = useExcelContext();
  const header = ExcelContext?.xData[0];

  return useMemo(() => {
    const len = ExcelContext?.xData.length - 1;
    const xData = ExcelContext?.xData.slice(1, len + 1);
    const obj = {};
    const axis = [];
    const values = [];

    const setMap = new Map();
    header?.forEach((val, idx) => {
      if (key == val) {
        xData.forEach((val) => {
          let value = setMap.get(val[idx]);
          setMap.set(val[idx], value == undefined ? 1 : value + 1);
        });
        return;
      }
    });

    for (let [key, value] of setMap.entries()) {
      axis.push(key);
      values.push(value);
    }
    obj.axis = axis.slice(0, dataLimit);
    obj.values = values.slice(0, dataLimit);
    return obj;
  }, [ExcelContext?.xData, key, dataLimit]);
}

export default useConstructData;
