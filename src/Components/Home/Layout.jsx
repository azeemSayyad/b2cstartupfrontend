// Layout.js

import { useLocation } from "react-router-dom";
import Navbar from "../Common/Navbar";




const Layout = ({ children }) => {

    const location = useLocation();

  // Define an array of route paths where the navbar should be hidden
  const excludeNavbarRoutes = ['/auth',"/registerService"];

  // Check if the current route should exclude the navbar
  const isNavbarHidden = excludeNavbarRoutes.includes(location.pathname);

  return (
    <div>
    {!isNavbarHidden && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
