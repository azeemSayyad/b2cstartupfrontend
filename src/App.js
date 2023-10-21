import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./Components/Home/Home";
import UserAuth from "./Components/Auth/UserAuth";
import Profile from "./Components/Profile/Profile";
import ServiceRegistration from "./Components/Auth/serviceRegistration";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<UserAuth/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/registerService" element={<ServiceRegistration/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
