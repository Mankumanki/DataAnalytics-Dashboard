function RestrictedFilter({ header, setKey, keyVal, setFilter }) {
  return (
    <div className="z-10 right-4 top-10 absolute w-44 h-44 text-sm overflow-auto p-2 text-slate-400 bg-[#212d48] shadow-sm shadow-[#212d48ea] animate-show">
      {header?.map((val) => {
        return (
          <a
            role="button"
            key={val}
            className={`block p-1 mb-1 ${
              val == keyVal ? "bg-slate-100 bg-opacity-5" : ""
            } hover:bg-slate-100 hover:bg-opacity-5`}
            onClick={() => {
              setKey(val);
              setFilter(false);
            }}
          >
            {val}
          </a>
        );
      })}
    </div>
  );
}

export default RestrictedFilter;
