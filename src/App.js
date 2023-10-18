import Home from "./Components/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserAuth from "./Components/Auth/UserAuth";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<UserAuth/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
