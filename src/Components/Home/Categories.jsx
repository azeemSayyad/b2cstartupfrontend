import civil_engineer from "../../assets/Images/civil_engineer.jpg";
import mation from "../../assets/Images/mation.jpg";
import ground_diggers from "../../assets/Images/ground_diggers.jpg";
import iron_work from "../../assets/Images/iron_work.jpg";
import centring from "../../assets/Images/centring.jpg";
import electrician from "../../assets/Images/electrician.jpg";
import plumber from "../../assets/Images/plumber.jpeg";
import ceiling from "../../assets/Images/ceiling.jpg";
import painter from "../../assets/Images/painting.jpg";
import tiles from "../../assets/Images/tiles.jpeg";
import steel_railing from "../../assets/Images/steel_railing.jpg";
import welder from "../../assets/Images/welder.jpg";
import carpenter from "../../assets/Images/carpentry.jpeg";
import cupboard from "../../assets/Images/cupboard.jpg";
import chipping from "../../assets/Images/chipping.jpg";

// import bike_mechanic from "../../assets/Images/bike_mechanic.jpg";
// import car_mechanic from "../../assets/Images/car_mechanic.jpg";
// import key_maker from "../../assets/Images/key_maker.jpg";
// import electronic_repair from "../../assets/Images/electronic_repair.jpg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading, setServiceProvidersFeed } from "../../state";

import { motion } from "framer-motion";

const Categories = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findServiceProviders = async (service) => {
    try {
      dispatch(setIsLoading());
      const response = await axios.get(`${BACKEND_URL}/user/get/${service}`);
      dispatch(setIsLoading());

      const data = [];
      for (let obj of response.data) {
        console.log(obj);
        data.push(obj);
      }

      dispatch(setServiceProvidersFeed({ data }));
      navigate(`/category/`);
    } catch (error) {
      dispatch(setIsLoading());
      console.log(error);
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  };

  const fields = [
    {
      field: "civil_engineer",
      img: civil_engineer,
      id: 1,
    },
    {
      field: "mation",
      img: mation,
      id: 2,
    },
    {
      field: "electrician",
      img: electrician,
      id: 3,
    },
    {
      field: "painting",
      img: painter,
      id: 4,
    },
    {
      field: "tiles",
      img: tiles,
      id: 5,
    },
    {
      field: "ceiling",
      img: ceiling,
      id: 6,
    },
    {
      field: "carpenter",
      img: carpenter,
      id: 7,
    },
    {
      field: "plumber",
      img: plumber,
      id: 8,
    },
    {
      field: "iron_work",
      img: iron_work,
      id: 9,
    },
    {
      field: "centring",
      img: centring,
      id: 10,
    },
    {
      field: "steel_railing",
      img: steel_railing,
      id: 11,
    },
    {
      field: "cupboard",
      img: cupboard,
      id: 12,
    },
    {
      field: "welder",
      img: welder,
      id: 13,
    },
    {
      field: "chipping",
      img: chipping,
      id: 14,
    },
    {
      field: "ground_diggers",
      img: ground_diggers,
      id: 15,
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "tween" }}
      className="min-w-[384px] max-w-[1500px] maxi:m-auto"
    >
      <div className="grid items-center grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 maxi:grid-cols-8  gap-3 mx-3 my-4 ">
        {fields.map(({ field, img, id }) => (
          <div
            key={id}
            onClick={() => findServiceProviders(field)}
            className="p-1 bg-white rounded-lg hover:shadow-md hover:shadow-[#023e7d]"
          >
            <div className=" overflow-hidden rounded-lg ">
              <img
                className="h-[100px]  rounded-lg  w-full object-cover hover:scale-105 duration-300"
                src={img}
                alt="icon"
              />
            </div>
            <p className="text-black p-1 text-center text-xl font-semibold capitalize overflow-scroll">
              {field}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
