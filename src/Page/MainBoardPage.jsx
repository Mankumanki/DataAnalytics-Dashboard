import Header from "../Components/Header/Header";
import MainBoard from "../Components/MainBoard/MainBoard";

function MainBoardPage() {
  return (
    <>
      <div className="min-[992px]:flex">
        <Header />
        <MainBoard />
      </div>
    </>
  );
}

export default MainBoardPage;
