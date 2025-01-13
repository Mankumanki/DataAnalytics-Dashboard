import { useState } from "react";
import { useExcelContext } from "../../Hooks/useExcelContext";
import Filter from "../Filter";
import useFilterHook from "../../Hooks/useFilterHook";
import { PieChart, BarChart } from "@mui/x-charts";
import useConstructData from "../../Hooks/useConstructData";
import BarGraphSkeleton from "../../LoadingState/BarGraphSkeleton";
import { useViewport } from "react-viewport-hooks";
import usePercentageData from "../../Hooks/usePercentageData";

function MainBoard() {
  const { vw } = useViewport();
  const ExcelContext = useExcelContext();
  const header = ExcelContext?.xData[0];

  const [key1, setKey1] = useState(header == undefined ? "" : header[0]);
  const [key2, setKey2] = useState(header == undefined ? "" : header[0]);
  const [key3, setKey3] = useState(header == undefined ? "" : header[0]);

  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);
  const [dataLimit1, setDataLimit1] = useState("50");
  const [dataLimit2, setDataLimit2] = useState("60");

  const param = useFilterHook(key2);
  const barParam = useConstructData(key1, dataLimit2);
  const pieParam = usePercentageData(key3, dataLimit1);

  return (
    <section
      id="Dashboard_Section"
      className="w-full max-[992px]:pt-20 min-[992px]:pl-72"
    >
      <div className="flex w-full max-[768px]:p-4 p-8 max-[768px]:flex-col gap-4">
        {/*Unique and total values chart with Filter*/}

        <div className="text-white w-1/2 h-60 max-[768px]:w-full bg-[#212d4874] p-2 rounded-md relative shadow-md shadow-inherit">
          <div className="p-6 flex flex-col justify-center items-center h-full gap-2">
            <p className="text-3xl font-semibold animate-show">
              {param.totalData == -1 ? 0 : param.totalData}
            </p>
            <p className="font-light">total values</p>
          </div>
        </div>

        {/*Unique Value Chart*/}

        <div className="w-1/2 max-[768px]:w-full h-60 bg-[#212d4874] p-2 rounded-md relative shadow-md shadow-inherit">
          <a
            className="absolute text-slate-300 right-4 hover:text-white"
            role="button"
            onClick={() => {
              setFilter2(!filter2);
            }}
          >
            <i className="fa-solid fa-filter"></i>
          </a>
          {filter2 ? (
            <Filter
              header={header}
              setKey={setKey2}
              keyVal={key2}
              setFilter={setFilter2}
            />
          ) : null}
          <div className="p-6 flex flex-col justify-center items-center h-full gap-2 text-white">
            <div className="flex flex-col justify-center items-center text-center gap-2">
              <p className="font-light text-lg text-slate-300">{key2}</p>
              <p className="text-3xl font-semibold animate-show">
                {param[key2]}
              </p>
              <p className="font-light">unique values</p>
            </div>
          </div>
        </div>
      </div>

      {/*Bar graph*/}
      <div className="w-full max-[768px]:p-4 p-8 ">
        {!header?.length ? (
          <BarGraphSkeleton />
        ) : (
          <div className="w-full relative ">
            <a
              className="absolute text-slate-300 right-4 hover:text-white z-10"
              role="button"
              onClick={() => {
                setFilter1(!filter1);
              }}
            >
              <i className="fa-solid fa-filter"></i>
            </a>
            {filter1 ? (
              <Filter
                header={header}
                setKey={setKey1}
                keyVal={key1}
                setFilter={setFilter1}
              />
            ) : null}
            <div className="p-6 flex flex-col justify-center items-center text-center overflow-auto gap-4">
              <div className="flex gap-2 text-slate-300 items-center">
                <label htmlFor="limit" className="mt-3 max-[576px]:text-xs">
                  Limit Data :
                </label>
                <input
                  id="limit"
                  type="text"
                  className="text-center w-16 outline-none bg-transparent border-b-2 border-slate-400 transition-colors focus:border-slate-200"
                  value={dataLimit2}
                  onChange={(e) => {
                    setDataLimit2(e.target.value);
                  }}
                ></input>
              </div>
              <BarChart
                series={[{ data: barParam.values }]}
                height={290}
                yAxis={[{ tickLabelStyle: { fill: "white" } }]}
                xAxis={[
                  {
                    data: barParam.axis,
                    scaleType: "band",
                    tickLabelStyle: { fill: "white" },
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </div>
          </div>
        )}
      </div>

      {/*Pie Chart*/}
      <div className="flex w-full max-[768px]:p-4 p-8 max-[768px]:flex-col gap-4">
        {!header?.length ? (
          <BarGraphSkeleton />
        ) : (
          <div className="text-white w-full max-[768px]:w-full bg-[#212d4874] p-2 rounded-md relative shadow-md shadow-inherit">
            <a
              className="absolute text-slate-300 right-4 hover:text-white z-10"
              role="button"
              onClick={() => {
                setFilter3(!filter3);
              }}
            >
              <i className="fa-solid fa-filter"></i>
            </a>
            {filter3 ? (
              <Filter
                header={header}
                setKey={setKey3}
                keyVal={key3}
                setFilter={setFilter3}
              />
            ) : null}
            <div className="p-6 flex flex-col justify-center items-center text-center overflow-auto gap-2">
              <p className="text-lg font-semibold max-[576px]:text-sm">
                Distribution based on {key3}
              </p>
              <div className="flex gap-2 text-slate-300 items-center">
                <label htmlFor="limit" className="mt-3 max-[576px]:text-xs">
                  Limit Data :
                </label>
                <input
                  id="limit"
                  type="text"
                  className="text-center w-16 outline-none bg-transparent border-b-2 border-slate-400 transition-colors focus:border-slate-200"
                  value={dataLimit1}
                  onChange={(e) => {
                    setDataLimit1(e.target.value);
                  }}
                ></input>
              </div>
              <PieChart
                series={[
                  {
                    data: pieParam,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
                width={vw < 576 ? 350 : 500}
                height={vw < 576 ? 350 : 500}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MainBoard;
