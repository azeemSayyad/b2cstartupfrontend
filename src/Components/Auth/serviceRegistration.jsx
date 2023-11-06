import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setUserServiceList } from "../../state";

import { Multiselect } from "multiselect-react-dropdown";

import axios from "axios";

import { Input, Textarea } from "@material-tailwind/react";

import microsoft from "../../assets/Images/microsoft.jpg";
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const ServiceRegistration = () => {

  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const [selectedImages, setSelectedImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const imageNames = [];
  if (selectedImages) {
    for (let image of selectedImages) {
      console.log(image.name);
      imageNames.push(image.name);
    }
  }

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 3) {
      e.target.value = ""; 
      setErrorMessage("You can only select up to 3 Images")
    } else {
      setSelectedImages(files);
    }
  };

  const [formData, setFormData] = useState({
    about: "",
    location: "",
  });

  const [selectedProfessionOptions, setSelectedProfessionOptions] = useState(
    []
  );
  const [selectedExperienceOption, setSelectedExperienceOption] = useState();

  const professionData = [
    { field: "Tiles", id: 1 },
    { field: "Carpentry", id: 2 },
    { field: "Painting", id: 3 },
    { field: "Electrician", id: 4 },
  ];
  const [professionOptions] = useState(professionData);

  const experienceData = [
    { exp: "0-1 year", id: 1 },
    { exp: "1-3 years", id: 2 },
    { exp: "3-5 years", id: 3 },
    { exp: "5-10 years", id: 4 },
    { exp: "10-20 years", id: 5 },
    { exp: "20-30 years", id: 6 },
    { exp: "30-50 years", id: 7 },
    { exp: "50+ years", id: 8 },
  ];
  const [experienceOptions] = useState(experienceData);

  const customOptionStyles = {
    option: {
      backgroundColor: "aliceblue",
      color: "black",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "8px",
      margin: "2px 0",
      cursor: "pointer",
      transition: "background-color 0.3s",
      "&:hover": {
        background: "red",
      },
    },
    chips: {
      background: "#059669",
      color: "white",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({ name: "", profession: [] });
  };

  const handleSubmit = async () => {
    try {
      console.log(selectedImages);
      dispatch(setIsLoading());
      const professionList = [];

      const formData1 = new FormData();
      if(selectedImages){
        for (const image of selectedImages) {
          formData1.append("images", image);
        }
      }

      for (let option of selectedProfessionOptions) {
        let field = option.field.toLowerCase();
        professionList.push(field);
      }

      formData1.append("user_id", _id);
      formData1.append("profession", JSON.stringify(professionList));
      formData1.append("experience", selectedExperienceOption[0].exp);
      formData1.append("about", formData.about);
      formData1.append("location", formData.location);

      const resp = await axios.post(
        `${BACKEND_URL}/auth/serviceRegistration`,
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(resp);
      dispatch(setUserServiceList(resp.data));
      dispatch(setIsLoading());
      navigate("/");
    } catch (error) {
      dispatch(setIsLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className=" bg-[#023e7d] w-full md:pt-[100px] pt-[50px] pb-5 min-w-[384px] max-w-[2400px] min-h-screen">
      <div className="m-auto lg:w-[50%] sm:w-[80%] w-[98%] md:rounded-[30px] bg-white  border space-y-3 p-4 border-black justify-center items-center  rounded-[15px] min-h-[50%]">
        <div className="flex space-y-3 flex-col justify-center items-center">
          <img
            src={microsoft}
            className=" h-[60px] object-cover object-center mb-[-10px]"
            alt="logo"
          />
          <p className="block font-bold text-3xl text-center text-black">
            Sign Up to Share Your Outstanding Services
          </p>

          <p className="text-center">Join us to be the one among hundreds.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="md:w-[70%] w-[90%] m-auto space-y-3">
            <div className="flex flex-col justify-center items-center space-y-3 ">
              <div className="  rounded-lg  w-full  ">
              {errorMessage && (
                <div className="border border-red-900 bg-red-100 w-full p-2 rounded-lg mt-1 mb-3">
                  {errorMessage}
                </div>
              )}
                <Multiselect
                  onSelect={(selectedList, selectedOption) =>
                    setSelectedProfessionOptions(selectedList)
                  }
                  onRemove={(selectedList, removedOption) =>
                    setSelectedProfessionOptions(selectedList)
                  }
                  placeholder="Select Your Field"
                  displayValue="field"
                  options={professionOptions}
                  avoidHighlightFirstOption={true}
                  style={customOptionStyles}
                />
              </div>
              <div className="  rounded-lg  w-full">
                <Multiselect
                  singleSelect={true}
                  onSelect={(selectedList, selectedOption) =>
                    setSelectedExperienceOption(selectedList)
                  }
                  onRemove={(selectedList, removedOption) =>
                    setSelectedExperienceOption(selectedList)
                  }
                  placeholder="Experience"
                  displayValue="exp"
                  options={experienceOptions}
                  avoidHighlightFirstOption={true}
                  popupHeight="100"
                  style={customOptionStyles}
                />
              </div>

              <Input
                label="Location"
                name="location"
                className=" rounded-lg w-full "
                value={formData.location}
                onChange={handleChange}
              />

              <Textarea
                label="About (optional)"
                name="about"
                className=" rounded-lg  w-full "
                value={formData.about}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full space-y-2 ">
              <p className="text-black">Upload Images</p>
              <div className="border border-gray-600 rounded-lg py-3  hover:border-dashed hover:border-gray-800 hover:cursor-pointer">
                {selectedImages === null ? (
                  <div
                    onClick={openFilePicker}
                    className=" rounded-lg flex items-center justify-center"
                  >
                    <IoAddOutline
                      className=" object-cover h-[100px] w-[100px] hover:scale-95"
                      color="gray"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between gap-3 px-3 items-center">
                    <div className="flex flex-wrap gap-1">
                      {imageNames.map((name, i) => (
                        <p key={i} className="p-2 rounded-md bg-gray-300">
                          {name}
                        </p>
                      ))}
                    </div>
                    <div
                      className="mr-2 cursor-pointer "
                      onClick={() => setSelectedImages(null)}
                    >
                      <MdDelete size={"25px"} />
                    </div>
                  </div>
                )}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="pb-4">
              <input
                onClick={handleSubmit}
                type="submit"
                className="bg-[#023e7d] hover:bg-[#002855] w-full p-2 text-center text-white text-lg rounded-md hover:cursor-pointer"
                value={"Register"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRegistration;
