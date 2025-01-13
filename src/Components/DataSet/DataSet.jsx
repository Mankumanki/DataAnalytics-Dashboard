import { useEffect, useRef, useState } from "react";
import xlsx from "read-excel-file";
import { useExcelContext } from "../../Hooks/useExcelContext";

function DataSet() {
  const csvFile = useRef(null);
  const ExcelContext = useExcelContext();
  const [load, setLoad] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (ExcelContext.xData) {
      setLoad(0);
    }
    console.log("Hi");
  }, [ExcelContext]);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      setLoad(1);
      const rows = await xlsx(file);
      ExcelContext.setXData(rows);
    } catch (err) {
      alert("Error Reading File. Please try again");
      console.log(err);
    }
  }

  /*Handle Page Logic*/
  function movePageLeft() {
    if (ExcelContext?.xData.length != 0 && page != 1) {
      setPage(page - 1);
    }
  }
  function movePageRight() {
    const len = Math.ceil((ExcelContext?.xData.length - 1) / 100);
    if (ExcelContext?.xData.length != 0 && page < len) {
      setPage(page + 1);
    }
  }

  return (
    <section className="h-dvh w-full max-[992px]:pt-20 min-[992px]:pl-72">
      <div className="flex flex-col gap-8 max-[768px]:p-4 p-10 w-full h-full">
        <div className="flex justify-between items-center">
          {/*Pagination Header*/}
          <div className="flex gap-2 items-center">
            <a className="text-white" role="button" onClick={movePageLeft}>
              <i className="fa-solid fa-angle-left"></i>
            </a>
            <p className="text-white bg-slate-400 bg-opacity-20 p-2 rounded-md">
              {ExcelContext?.xData.length == 0 ? 0 : page}{" "}
              <span className="text-slate-400">
                of {Math.ceil((ExcelContext?.xData.length - 1) / 100)}
              </span>
            </p>
            <a className="text-white" role="button" onClick={movePageRight}>
              <i className="fa-solid fa-angle-right"></i>
            </a>
          </div>

          {/*Import XSLSX Button*/}
          {!load ? (
            <button
              className="text-white bg-slate-700 rounded-md p-2 min-[768px]:text-lg hover:bg-slate-600 transition-colors w-28 max-[576px]:w-24"
              onClick={() => {
                csvFile?.current?.click();
              }}
            >
              <i className="fa-solid fa-upload mr-3 max-[768px]:text-sm"></i>
              Import
            </button>
          ) : (
            <div className="bg-slate-700 rounded-lg h-full p-2 w-28 max-[576px]:w-24 flex justify-center items-center">
              <span className="loader"></span>
            </div>
          )}
          <input
            ref={csvFile}
            type="file"
            id="file"
            accept=".xlsx"
            className="hidden"
            onChangeCapture={(e) => {
              handleFile(e);
            }}
          />
        </div>
        {ExcelContext?.xData.length == 0 ? (
          <Skeleton />
        ) : (
          <div className="w-full h-full flex justify-center overflow-x-auto">
            <table className="table-fixed w-fit h-fit mb-4">
              <thead className="w-fit h-fit sticky top-0">
                <tr className="flex mb-4 w-fit h-fit border-1 border-black rounded-sm bg-emerald-400">
                  {ExcelContext?.xData[0]?.map((val) => {
                    return (
                      <th
                        className="flex items-center justify-center text-center text-black font-semibold h-10 w-32 overflow-hidden"
                        key={val}
                      >
                        {val.length > 10 ? `${val.slice(0, 10)}...` : val}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ExcelContext?.xData
                  ?.slice((page - 1) * 100 + 1, page * 100 + 1)
                  ?.map((arrVal, idx) => {
                    return (
                      <tr
                        key={`${arrVal[0]} ${idx}`}
                        className="flex w-fit h-fit"
                      >
                        {arrVal.map((val, idx) => {
                          return (
                            <td
                              key={`${val} ${idx}`}
                              className="flex items-center justify-center text-center p-2 text-slate-300 font-light text-sm w-32 border-1 border-slate-500"
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="max-[768px]:p-4 p-10 w-full h-full flex justify-center items-center border-slate-600 border-1 rounded-sm">
      <svg
        height="100"
        viewBox="0 0 511.93 512"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
      >
        <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
          <g id="Layer_2" data-name="Layer 2">
            <g id="ban">
              <path
                d="m279.17 473.77a10 10 0 0 1 -7.07-17.07l184.6-184.6a10 10 0 0 1 14.14 14.14l-184.6 184.6a10 10 0 0 1 -7.07 2.93z"
                fill="#79c7ab"
                fillOpacity="1"
                data-original-color="#ffbb04ff"
                stroke="none"
                strokeOpacity="1"
              />
              <path
                d="m215.84 216.8c-56.45 0-109.67-10.58-149.84-29.8-42.57-20.34-66-48.25-66-78.6s23.43-58.26 66-78.6c40.17-19.22 93.39-29.8 149.84-29.8s109.66 10.58 149.86 29.8c42.54 20.34 66 48.25 66 78.6s-23.43 58.26-66 78.6c-40.2 19.22-93.42 29.8-149.86 29.8zm0-196.8c-53.52 0-103.68 9.89-141.24 27.84-34.7 16.59-54.6 38.66-54.6 60.56s19.9 44 54.6 60.56c37.56 17.95 87.72 27.84 141.24 27.84s103.67-9.89 141.23-27.8c34.7-16.59 54.6-38.66 54.6-60.56s-19.9-44-54.6-60.56c-37.56-17.99-87.71-27.88-141.23-27.88z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
              <path
                d="m215.84 315.2c-56.45 0-109.67-10.58-149.87-29.8-42.54-20.34-65.97-48.25-65.97-78.6a10 10 0 0 1 20 0c0 21.9 19.9 44 54.6 60.56 37.56 17.95 87.72 27.84 141.24 27.84a417.17 417.17 0 0 0 43.5-2.25 10 10 0 1 1 2.1 19.88 435.47 435.47 0 0 1 -45.6 2.37z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
              <path
                d="m215.84 413.6c-56.45 0-109.67-10.6-149.84-29.8-42.57-20.34-66-48.25-66-78.6a10 10 0 0 1 20 0c0 21.9 19.9 44 54.6 60.56 37.56 17.95 87.72 27.84 141.24 27.84 9.33 0 18.82-.31 28.19-.93a10 10 0 0 1 1.31 19.95c-9.8.65-19.73.98-29.5.98z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
              <path
                d="m215.84 512c-56.45 0-109.67-10.58-149.84-29.8-42.57-20.34-66-48.2-66-78.6v-283.15a10 10 0 1 1 20 0v283.15c0 21.9 19.9 44 54.6 60.56 37.56 17.95 87.72 27.84 141.24 27.84 34.18 0 67.89-4.17 97.48-12.05a10 10 0 1 1 5.15 19.32c-31.25 8.33-66.74 12.73-102.63 12.73z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
              <path
                d="m421.67 261a10 10 0 0 1 -10-10v-142.6a10 10 0 0 1 20 0v142.6a10 10 0 0 1 -10 10z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
              <g fill="#ffbb04">
                <path
                  d="m50.16 220.82a9.85 9.85 0 0 1 -1.95-.2 10.1 10.1 0 0 1 -1.87-.57 10.24 10.24 0 0 1 -1.73-.92 9.57 9.57 0 0 1 -1.52-1.24 10 10 0 0 1 1.52-15.39 10.24 10.24 0 0 1 1.73-.92 10.1 10.1 0 0 1 1.87-.57 9.9 9.9 0 0 1 3.91 0 10.58 10.58 0 0 1 1.87.57 10 10 0 0 1 6 7.28 10 10 0 0 1 -2.74 9 9.57 9.57 0 0 1 -1.52 1.24 10.15 10.15 0 0 1 -1.72.92 10.58 10.58 0 0 1 -1.87.57 10 10 0 0 1 -1.98.23z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
                <path
                  d="m90.33 240.9a10 10 0 0 1 -2-.2 10.34 10.34 0 0 1 -1.87-.57 10.15 10.15 0 0 1 -1.72-.92 9.57 9.57 0 0 1 -1.48-1.21 10 10 0 0 1 -2.74-9 10.58 10.58 0 0 1 .57-1.87 10 10 0 0 1 5.41-5.41 10.34 10.34 0 0 1 1.87-.57 9.9 9.9 0 0 1 3.91 0 10.1 10.1 0 0 1 1.87.57 10.24 10.24 0 0 1 1.73.92 10.75 10.75 0 0 1 1.52 1.25 9.57 9.57 0 0 1 1.24 1.52 10.15 10.15 0 0 1 .92 1.72 10.58 10.58 0 0 1 .57 1.87 9.95 9.95 0 0 1 -4.25 10.27 10.24 10.24 0 0 1 -1.73.92 10.1 10.1 0 0 1 -1.87.57 9.85 9.85 0 0 1 -1.95.14z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
                <path
                  d="m50.16 321.22a10 10 0 0 1 -7.07-2.93 9.57 9.57 0 0 1 -1.24-1.52 10 10 0 0 1 -1.49-3.59 9.66 9.66 0 0 1 0-3.91 10.1 10.1 0 0 1 .57-1.87 10.63 10.63 0 0 1 .92-1.73 10 10 0 0 1 1.24-1.52 9.57 9.57 0 0 1 1.52-1.24 9.87 9.87 0 0 1 1.73-.92 10.1 10.1 0 0 1 1.87-.57 9.9 9.9 0 0 1 3.91 0 10.58 10.58 0 0 1 1.88.58 10.15 10.15 0 0 1 1.72.92 9.57 9.57 0 0 1 1.52 1.24 10.11 10.11 0 0 1 1.25 1.52 10.63 10.63 0 0 1 .92 1.73 10.1 10.1 0 0 1 .57 1.87 10.15 10.15 0 0 1 0 3.91 10 10 0 0 1 -1.49 3.59 10.14 10.14 0 0 1 -2.77 2.77 10.15 10.15 0 0 1 -1.72.92 10.58 10.58 0 0 1 -1.87.57 10 10 0 0 1 -1.97.18z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
                <path
                  d="m90.33 341.31a10 10 0 0 1 -2-.2 10.58 10.58 0 0 1 -1.87-.57 10.15 10.15 0 0 1 -1.72-.92 9.57 9.57 0 0 1 -1.52-1.24 10.11 10.11 0 0 1 -1.22-1.52 10.63 10.63 0 0 1 -.92-1.73 10.1 10.1 0 0 1 -.57-1.87 10.15 10.15 0 0 1 0-3.91 10.1 10.1 0 0 1 .57-1.87 10.63 10.63 0 0 1 .92-1.73 10.11 10.11 0 0 1 1.25-1.52 9.57 9.57 0 0 1 1.53-1.23 10 10 0 0 1 3.59-1.49 9.9 9.9 0 0 1 3.91 0 10.1 10.1 0 0 1 1.87.57 10.24 10.24 0 0 1 1.73.92 9.57 9.57 0 0 1 1.52 1.24 10 10 0 0 1 1.24 1.52 10.63 10.63 0 0 1 .92 1.73 10.1 10.1 0 0 1 .57 1.87 9.66 9.66 0 0 1 0 3.91 10.1 10.1 0 0 1 -.57 1.87 10.63 10.63 0 0 1 -.92 1.73 9.72 9.72 0 0 1 -2.76 2.76 10.24 10.24 0 0 1 -1.73.92 10.1 10.1 0 0 1 -1.87.57 9.85 9.85 0 0 1 -1.95.19z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
                <path
                  d="m50.16 421.63a9.84 9.84 0 0 1 -1.95-.19 10.1 10.1 0 0 1 -1.87-.57 9.87 9.87 0 0 1 -1.73-.92 10.21 10.21 0 0 1 -1.52-1.25 9.57 9.57 0 0 1 -1.24-1.52 10.15 10.15 0 0 1 -.92-1.72 10.58 10.58 0 0 1 -.57-1.87 10 10 0 0 1 -.2-2 9.85 9.85 0 0 1 .2-1.95 10.1 10.1 0 0 1 .57-1.87 9.87 9.87 0 0 1 .92-1.73 9.72 9.72 0 0 1 2.76-2.76 9.87 9.87 0 0 1 1.73-.92 10.1 10.1 0 0 1 1.87-.57 9.9 9.9 0 0 1 3.91 0 10.58 10.58 0 0 1 1.87.57 10.15 10.15 0 0 1 1.72.92 9.57 9.57 0 0 1 1.52 1.24 10.21 10.21 0 0 1 1.25 1.52 9.87 9.87 0 0 1 .92 1.73 10.1 10.1 0 0 1 .57 1.87 9.84 9.84 0 0 1 .19 1.95 10 10 0 0 1 -.19 2 10.58 10.58 0 0 1 -.57 1.87 10 10 0 0 1 -5.4 5.41 10.58 10.58 0 0 1 -1.87.57 10 10 0 0 1 -1.97.19z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
                <path
                  d="m90.33 441.71a9.94 9.94 0 0 1 -2-.19 10 10 0 0 1 -3.55-1.52 10 10 0 0 1 -3.69-4.49 10.1 10.1 0 0 1 -.57-1.87 9.94 9.94 0 0 1 -.19-2 9.84 9.84 0 0 1 .19-1.95 10.1 10.1 0 0 1 .57-1.87 9.87 9.87 0 0 1 .92-1.73 10.15 10.15 0 0 1 1.24-1.52 10 10 0 0 1 3.25-2.16 10.1 10.1 0 0 1 1.87-.57 9.9 9.9 0 0 1 3.91 0 10.1 10.1 0 0 1 1.87.57 9.87 9.87 0 0 1 1.73.92 9.57 9.57 0 0 1 1.52 1.24 10 10 0 0 1 1.24 1.52 9.87 9.87 0 0 1 .92 1.73 10.1 10.1 0 0 1 .57 1.87 9.85 9.85 0 0 1 .2 1.95 10 10 0 0 1 -.2 2 10 10 0 0 1 -1.49 3.59 9.57 9.57 0 0 1 -1.24 1.52 10 10 0 0 1 -7.07 2.96z"
                  fill="#79c7ab"
                  fillOpacity="1"
                  data-original-color="#ffbb04ff"
                  stroke="none"
                  strokeOpacity="1"
                />
              </g>
              <path
                d="m371.47 511.93a140.07 140.07 0 0 1 -99.37-41.09c-54.79-54.79-54.79-143.95 0-198.74 54.79-54.79 144-54.79 198.74 0s54.79 144 0 198.74a140.07 140.07 0 0 1 -99.37 41.09zm-85.23-225.69a120.53 120.53 0 1 0 170.46 0 120.68 120.68 0 0 0 -170.46 0z"
                fill="#3b325e"
                fillOpacity="0.9490196078431372"
                data-original-color="#696969ff"
                stroke="none"
                strokeOpacity="1"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default DataSet;
