import tiles from "../../assets/Images/tiles.jpeg";
import carpentry from "../../assets/Images/carpentry.jpeg";
import plumber from "../../assets/Images/plumber.jpeg";
import ceiling from "../../assets/Images/ceiling.jpg";

import axios from "axios"

const BASE_URL_LOCAL = process.env.REACT_APP_BASE_URL_LOCAL;

const Categories = () => {

  const findServiceProviders = async()=>{
    console.log("loading..")
    const response = await axios.get("http://localhost:4000/user/get/Tiles");
    console.log("over")
    console.log(response.data);
  }

  return (
    <div className="min-w-[384px] max-w-[1500px] maxi:m-auto">
      <div className="grid items-center grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 maxi:grid-cols-8  gap-3 mx-3 my-4 ">
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div onClick={findServiceProviders} className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
        <div className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-purple-300">
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
 