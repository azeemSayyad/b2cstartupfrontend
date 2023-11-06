import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../state";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(setIsLoading())
  }
  return (
    <div onClick={handleClick}>
      {isLoading && (
        <div className="fixed z-50 w-full h-full flex items-center justify-center bg-white opacity-50">
          <div className=" animate-spin">
            <CgSpinner size={"30px"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
