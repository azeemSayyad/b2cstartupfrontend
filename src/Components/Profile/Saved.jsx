import { useSelector } from "react-redux";
import SavedCard from "./SavedCard";

const Saved = () => {
  const user = useSelector((state) => state.user);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4 min-w-[384px] maxi:m-auto max-w-[1500px]">
      {user &&
        user.saved.map(
          ({name, experience, location, about, gallery, profession, _id ,profilePicture}) => (
              <SavedCard
              name={name}
                key={_id}
                experience={experience}
                location={location}
                about={about}
                gallery={gallery}
                profession={profession}
                _id={_id}
                profilePicture={profilePicture}
              />
          )
        )}
    </div>
  );
};

export default Saved;
