import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  return (
    <div className="flex space-x-4 border-black m-10 w-[500px] h-[500px] bg-white">
      <div className="w-[40px] h-[70px]">
        <Skeleton circle style={{width:"40px",height:"50px"}}/>
      </div>
      <div  className="w-[400px] h-[200px]">
        <Skeleton count={5} style={{marginBottom:"4px"}}/>
      </div>
    </div>
  );
};

export default Profile;
