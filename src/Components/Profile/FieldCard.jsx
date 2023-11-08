import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserServiceList } from "../../state";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
} from "@material-tailwind/react";

import axios from "axios";
import FetchImageS3 from "./FetchImageS3";

const FieldCard = ({
  _id,
  experience,
  location,
  profession,
  about,
  gallery,
}) => {
  
const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const [galleryUrls, setGalleryUrls] = useState(null);
  const [isDeleteId, setIsDeleteId] = useState(null);

    const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDeleteService = async () => {
    try {
      let service_id = isDeleteId;
      setIsDeleteId(null);
      dispatch(setIsLoading());

      const resp = await axios.post(
        `${BACKEND_URL}/user/deleteService/${service_id}`,
        { user_id: user._id }
      );

      console.log(resp.data);
      dispatch(setUserServiceList(resp.data));
      dispatch(setIsLoading());
    } catch (error) {
      dispatch(setIsLoading());
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchUrls = async () => {
      try {
        const urls = [];
        if (gallery) {
          for (let imagePath of gallery) {
            console.log(imagePath);
            const url = await FetchImageS3({ imagePath });
            urls.push(url);
          }
          setGalleryUrls(urls);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUrls();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className=" rounded-lg shadow-sm bg-[#1d4e89] text-white space-y-5 py-4">
        {/* Content */}
        <div className="px-4 space-y-3">
          <p className="">
            Experience: <span className="font-bold">{experience}</span>
          </p>
          <p className="">
            Location: <span className="font-bold">{location}</span>
          </p>
          <div className="flex overflow-scroll space-x-2">
            <p>Profession:</p>
            {profession &&
              profession.map((field, i) => (
                <p key={i} className="bg-green-400 rounded-sm px-2">
                  {field}
                </p>
              ))}
          </div>

          <p className="">
            About: <span className="font-bold">{about}</span>
          </p>

          {/* Gallery Carousel */}
          <div className="h-[200px] md:w-[70%] md:m-auto">
            <Carousel className="rounded-xl" autoplay={true} loop>
              {galleryUrls &&
                galleryUrls.map((url, i) => (
                  <img
                    className="object-cover w-full h-full"
                    src={url}
                    alt="virat"
                  />
                ))}
            </Carousel>
          </div>

          <div className=" text-white text-xl  p-2 w-full rounded-lg flex gap-2">
            <button
              onClick={() => setIsDeleteId(_id)}
              className=" bg-red-400 text-center w-uf w-full rounded-md px-3"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={isDeleteId ? true : false}
        handler={() => setIsDeleteId(null)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete Service</DialogHeader>
        <DialogBody>
          Are you sure you want to delete? There is no backup available.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="white"
            onClick={() => setIsDeleteId(null)}
            className="mr-1 text-gray-800"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => handleDeleteService()}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FieldCard;
