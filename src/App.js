import Home from "./Components/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserAuth from "./Components/Auth/UserAuth";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="">
      <Home/>
      
    </div>
=======
=======
>>>>>>> deaf5c09c383502a80ba0052e00b74bf468cad11
=======
>>>>>>> deaf5c09c383502a80ba0052e00b74bf468cad11
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<UserAuth/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> deaf5c09c383502a80ba0052e00b74bf468cad11
=======
>>>>>>> deaf5c09c383502a80ba0052e00b74bf468cad11
=======
>>>>>>> deaf5c09c383502a80ba0052e00b74bf468cad11
  );
}

export default App;
