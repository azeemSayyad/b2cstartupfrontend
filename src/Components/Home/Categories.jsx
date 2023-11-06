import tiles from "../../assets/Images/tiles.jpeg";
import carpentry from "../../assets/Images/carpentry.jpeg";
import plumber from "../../assets/Images/plumber.jpeg";
import ceiling from "../../assets/Images/ceiling.jpg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading, setServiceProvidersFeed } from "../../state";



const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findServiceProviders = async (service) => {
    try {
      dispatch(setIsLoading());
      const response = await axios.get(`http://localhost:4000/user/get/${service}`);
      dispatch(setIsLoading());

      const data = []
      for(let obj of response.data){
        console.log(obj);
        data.push(obj);
      }

      dispatch(setServiceProvidersFeed({data}))
      navigate(`/category/`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-[384px] max-w-[1500px] maxi:m-auto">
      <div className="grid items-center grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 maxi:grid-cols-8  gap-3 mx-3 my-4 ">
        <div 
          onClick={()=>findServiceProviders("tiles")} className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-[#023e7d]">
          <div className=" overflow-hidden rounded-lg ">
            <img
              className="h-[100px]  rounded-lg  w-full object-cover hover:scale-105 duration-300"
              src={tiles}
              alt="icon"
            />
          </div>
          <p className="text-black p-1 text-center text-xl font-semibold">
            Tiles
          </p>
        </div>
        <div
          onClick={()=>findServiceProviders("carpentry")}
          className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300"
        >
          <div className=" overflow-hidden rounded-lg">
            <img
              className="h-[100px]  rounded-lg  w-full object-cover hover:scale-105 duration-300"
              src={carpentry}
              alt="icon"
            />
          </div>
          <p className="text-black p-1 text-center text-xl font-semibold">
            Carpentry
          </p>
        </div>
        <div 
          onClick={()=>findServiceProviders("ceiling")} className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
          <div className=" overflow-hidden rounded-lg">
            <img
              className="h-[100px]  rounded-lg  w-full object-cover hover:scale-105 duration-300"
              src={ceiling}
              alt="icon"
            />
          </div>
          <p className="text-black p-1 text-center text-xl font-semibold">
            Ceiling
          </p>
        </div>
        <div 
          onClick={()=>findServiceProviders("plumber")} className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
          <div className=" overflow-hidden rounded-lg">
            <img
              className="h-[100px]  rounded-lg  w-full object-cover hover:scale-105 duration-300"
              src={plumber}
              alt="icon"
            />
          </div>
          <p className="text-black p-1 text-center text-xl font-semibold">
            Plumber
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Categories;
