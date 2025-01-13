import Header from "../Components/Header/Header";
import DataSet from "../Components/DataSet/DataSet";
import "../../public/CSS/App.css";

function DataSetPage() {
  return (
    <div className="min-[992px]:flex">
      <Header />
      <DataSet />
    </div>
  );
}

export default DataSetPage;
