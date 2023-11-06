import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import Categories from "./Categories";
import Category from "./Category";
import Loading from "./Loading";

const Home = () => {
  return (
    <div className="flex flex-col  min-w-[384px] max-w-[1500px] maxi:m-auto">
      <Categories />
    </div>
  );
};

export default Home;
