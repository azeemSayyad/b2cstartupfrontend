import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// const ServiceProviderCard = () => {
//     return(
//         <div className="flex flex-col ">
//             <div></div>
//             <div></div>
//         </div>
//     )
// }

const SkeletonLoading = () => {
  console.log("skeleton")
  return (
    <div className="flex flex-col items-center space-y-4 border-black   bg-white py-4 ">
      <div className="">
        <Skeleton circle style={{width:"120px",height:"120px"}}/>
      </div>
      <div  className="flex items-center">
        <Skeleton count={3} style={{marginBottom:"10px",width:"250px"}}/>
      </div>
      <div className="flex">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} style={{ marginRight: '5px', width: "70px" }} />
      ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;
