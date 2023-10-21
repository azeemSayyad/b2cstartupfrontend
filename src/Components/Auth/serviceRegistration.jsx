import { useSelector, useDispatch } from "react-redux";
import microsoft from "../../assets/Images/microsoft.jpg";
import { useEffect, useState } from "react";

import { Multiselect } from "multiselect-react-dropdown";
import { Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceRegistration = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "azeem",
    about: "",
    location: "",
  });

  const [selectedProfessionOptions, setSelectedProfessionOptions] = useState([]);
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
      const body = {
        user_id: "6530fa8af8bd641ce0bfad02",
        profession: selectedProfessionOptions,
        experience: selectedExperienceOption[0].exp,
        about: formData.about,
        location: formData.location,
      };
      console.log(body,selectedExperienceOption)
      const resp = await axios.post(
        "http://localhost:4000/auth/serviceRegistration",
        { body }
      );
      console.log(resp);
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className=" bg-purple-700 w-full md:pt-[100px] pt-[50px] pb-5 min-w-[384px] max-w-[2400px] min-h-screen">
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
              <Input
                label="Name"
                name="name"
                className=" rounded-lg w-full "
                value={formData.name}
                onChange={handleChange}
              />

              <div className="  rounded-lg  w-full  ">
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

            <div className="pb-4">
              <input
                onClick={handleSubmit}
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 w-full p-2 text-center text-white text-lg rounded-md hover:cursor-pointer"
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
