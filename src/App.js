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

import { AnimatePresence } from "framer-motion";

import { SkeletonTheme } from "react-loading-skeleton";
import SkeletonLoading from "./Components/Profile/SkeletonLoading";

function App() {
  const auth = Boolean(useSelector((state) => state.token));

  return (
    <SkeletonTheme baseColor="#ced4da" highlightColor="#e9ecef">
      <AnimatePresence>
        <BrowserRouter>
          <Loading />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<UserAuth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/skeleton" element={<SkeletonLoading />} />
              <Route
                path="/registerService"
                element={auth ? <ServiceRegistration /> : <UserAuth />}
              />
              <Route path="/category/:service" element={<Category />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route
                path="/serviceProviderProfile/:service_id"
                element={<ServiceProviderProfile />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AnimatePresence>
    </SkeletonTheme>
  );
}

export default App;
