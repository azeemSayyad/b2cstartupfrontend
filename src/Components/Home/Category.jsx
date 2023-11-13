// import googleAdd from "../../assets/Images/googleAdd.jpeg";
import ServiceProviderCard from "./serviceProviderCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import SkeletonLoading from "../Profile/SkeletonLoading";
import { useEffect, useState } from "react";
import axios from "axios";
import { setServiceProvidersFeed } from "../../state";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const serviceFeed = useSelector((state) => state.serviceProvidersFeed);

  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { service } = useParams();

  const handleClick = (service_id) => {
    navigate(`/serviceProviderProfile/${service_id}`);
    // here i want to open whole service profile over this page, how can i do this
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BACKEND_URL}/user/get/${service}`);
        setIsLoading(false);
        const data = [];
        for (let obj of response.data) {
          data.push(obj);
        }
        dispatch(setServiceProvidersFeed({ data }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeed();
    // eslint-disable-next-line
  }, []);

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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "tween" }}
    >
      {isLoading ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 m-2 min-w-[374px] max-w-[1500px] maxi:m-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="m-2 px-2 py-4 rounded-lg">
              <SkeletonLoading key={i} />
            </div>
          ))}
        </div>
      ) : serviceFeed ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 m-2 min-w-[374px] max-w-[1500px] maxi:m-auto">
          {serviceFeed &&
            serviceFeed.map(
              ({
                _id,
                name,
                contact,
                about,
                experience,
                profession,
                profilePicture,
                location,
                gallery,
              }) => (
                <div key={_id} onClick={() => handleClick(_id)}>
                  <ServiceProviderCard
                    name={name}
                    contact={contact}
                    about={about}
                    experience={experience}
                    profession={profession}
                    profilePicture={profilePicture}
                    location={location}
                    gallery={gallery}
                  />
                </div>
              )
            )}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[60%] mt-10">
            <p className="text-2xl font-bold">
              Unfortunately, there are no registered service providers for this
              service at the moment.
            </p>
            <p className="text-2xl font-bold mt-4">
              Please check back later or consider exploring other service
              options.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Category;

// <div className="md:flex space-x-2 mx-2">
// <div className='flex md:basis-[70%] border border-black h-[300px]'>

// </div>
// <div className='flex md:basis-[30%] border border-black h-[300px]'>
//     <img className="object-cover h-full w-full" src={googleAdd} alt="googleAdd" />
// </div>
// </div>
