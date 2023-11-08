import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import UserAuth from "./Components/Auth/UserAuth";
import Profile from "./Components/Profile/Profile";
import ServiceRegistration from "./Components/Auth/serviceRegistration";
import { useSelector } from "react-redux";
import Category from "./Components/Home/Category";

import Layout from "./Components/Home/Layout";
import EditProfile from "./Components/Profile/EditProfile";
import Loading from "./Components/Home/Loading";
import ServiceProviderProfile from "./Components/Profile/ServiceProviderProfile";
import Saved from "./Components/Profile/Saved";

import { motion, useAnimation } from "framer-motion";

function Navigation() {
  const auth = Boolean(useSelector((state) => state.token));

  const controls = useAnimation();

  // You can define animations for entering and exiting the route components here
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
    // <motion.div
    //   initial="initial"
    //   animate="animate"
    //   exit="exit"
    //   variants={pageVariants}
    //   transition={{ type: "tween" }}
    // >
      <BrowserRouter>
        <Loading />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/registerService"
              element={auth ? <ServiceRegistration /> : <UserAuth />}
            />
            <Route path="/category" element={<Category />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route
              path="/serviceProviderProfile/:service_id"
              element={<ServiceProviderProfile />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    // </motion.div>
  );
}

export default Navigation;
