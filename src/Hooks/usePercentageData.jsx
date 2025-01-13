import { useMemo } from "react";
import { useExcelContext } from "./useExcelContext";

function usePercentageData(key, dataLimit1) {
  const ExcelContext = useExcelContext();
  const header = ExcelContext?.xData[0];

  return useMemo(() => {
    const len = ExcelContext?.xData.length - 1;
    const xData = ExcelContext?.xData.slice(1, len + 1);
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
      let obj = {};
      obj.id = key.toString();
      obj.value = (value / len) * 100;
      obj.label = key.toString();
      values.push(obj);
    }

    return values.slice(0, parseInt(dataLimit1));
  }, [ExcelContext?.xData, key, dataLimit1]);
}

export default usePercentageData;
