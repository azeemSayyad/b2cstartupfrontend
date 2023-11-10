import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state";

import { useNavigate, useParams } from "react-router-dom";

import { Carousel } from "@material-tailwind/react";

import FetchImageS3 from "./FetchImageS3";

import profileIconImage from "../../assets/Images/profileIconImage.png";
import add from "../../assets/Images/googleAdd.jpeg";
import saveIcon from "../../Icons/saveIcon.svg";

import { BiSolidPhoneCall } from "react-icons/bi";

import axios from "axios";
import { motion } from "framer-motion";

const ServiceProviderProfile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const [imageUrl, setImageUrl] = useState(null);
  const [galleryUrls, setGalleryUrls] = useState(null);

  const { service_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serviceProvidersFeed = useSelector(
    (state) => state.serviceProvidersFeed
  );
  const user = useSelector((state) => state.user);
  console.log(user);
  let isSaved = false;
  if (user) {
    isSaved = user.saved.some((service) => service._id === service_id);
  }

  const details = serviceProvidersFeed.filter(
    (service) => service_id === service._id
  );

  const addToSave = async () => {
    try {
      if (user && !isSaved) {
        const user_id = user._id;

        const response = await axios.patch(
          `${BACKEND_URL}/user/addToSave/${user_id}`,
          details[0]
        );
        console.log(response.data);
        dispatch(setUser(response.data));
      } else if (!user) {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchImage() {
      const imagePaths = details[0].gallery;
      if (details[0].profilePicture) {
        const imagePath = details[0].profilePicture;
        const url = await FetchImageS3({ imagePath });
        setImageUrl(url);
      }
      if (imagePaths) {
        const urls = [];
        for (let imagePath of imagePaths) {
          const url = await FetchImageS3({ imagePath });
          urls.push(url);
        }
        setGalleryUrls(urls);
      }
    }
    fetchImage();
    // eslint-disable-next-line
  }, []);

  // const pageVariants = {
  //   initial: {
  //     opacity: 0,
  //     x: "-100%",
  //   },
  //   animate: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.5,
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     x: "100%",
  //   },
  // };

  return (
    <motion.div
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // initial="initial"
      // animate="animate"
      // exit="exit"
      // variants={pageVariants}
      transition={{ type: "tween",duration:0.9 }}
      className="md:flex p-4 gap-2 maxi:m-auto max-w-[1500px] min-w-[384px]"
    >
      {/* Service Provider Profile  */}
      <div className="md:flex rounded-lg p-2 bg-white md:w-[75%]  ">
        <div className="flex flex-col space-y-3  w-full">
          <div className="flex flex-col md:flex-row justify-center items-center  rounded-sm">
            {/* Image  */}
            <div className="md:w-[50%] flex flex-col justify-center items-center space-y-1  rounded-sm">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
                  alt="pic"
                />
              ) : (
                <img
                  src={profileIconImage}
                  className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
                  alt="pic"
                />
              )}
              <p className="text-2xl text-gray-800 font-semibold">
                {details[0].name}
              </p>
            </div>
            {/* Details[0]  */}
            <div className="p-3 md:w-[50%] text-gray-700 text-xl rounded-sm  ">
              <p>
                Experience:{" "}
                <span className=" font-bold text-gray-900 ml-2">
                  {details[0].experience}
                </span>
              </p>
              <p>Location: 
              <span className=" font-bold text-gray-900 ml-2">
                {details[0].location}
              </span>
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-3">
              <div className="text-center text-xl">Services</div>
              <div className="flex flex-wrap gap-2">
                {details[0].profession &&
                  details[0].profession.map((field, i) => (
                    <div
                      className="px-2  bg-[#023e7d] text-center py-1  font-bold rounded-sm text-white  "
                      key={i}
                    >
                      {field}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className=" bg-white p-2 space-y-3">
            {details[0].about && (
              <div className="">
                About: <span>{details[0].about}</span>
              </div>
            )}
            {/* Gallery Carousel */}
            {details[0].gallery.length !== 0 && (
              <div className="h-[200px] md:w-[50%] md:m-auto">
                <Carousel className="rounded-xl">
                  {galleryUrls &&
                    galleryUrls.map((url, i) => (
                      <img
                        key={i}
                        className="object-cover w-full h-full"
                        src={url}
                        alt="...."
                      />
                    ))}
                </Carousel>
              </div>
            )}
            {/* Contact button  */}
            <div className=" flex space-x-3 p-1 justify-center cursor-pointer bg-green-400 text-white hover:bg-green-500 hover:font-semibold w-full  rounded-lg">
              <BiSolidPhoneCall size={"25px"} />
              <p>
                <a href={`tel:${details[0].contact}`}>Call</a>
              </p>
            </div>
            <div
              onClick={addToSave}
              className="flex justify-center p-1 text-center bg-orange-400 text-white hover:bg-orange-500 hover:font-semibold w-full  rounded-lg"
            >
              {isSaved ? (
                <p>Saved</p>
              ) : (
                <div className="flex space-x-2 cursor-pointer ">
                  <img src={saveIcon} className="" alt="saveIcon" />
                  <p>Save</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Space for Adds  */}
      <div className="flex md:w-[25%] text-3xl justify-center items-center p-4 bg-white">
        <img
          className="object-cover w-full h-[200px] md:h-full"
          src={add}
          alt="add"
        />
      </div>
    </motion.div>
  );
};

export default ServiceProviderProfile;
