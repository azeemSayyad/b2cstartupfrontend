import { useSelector } from "react-redux";
import SavedCard from "./SavedCard";
import { motion } from "framer-motion";

const Saved = () => {
  const user = useSelector((state) => state.user);

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
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "tween" }}
      className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4 min-w-[384px] maxi:m-auto max-w-[1500px]"
    >
      {user &&
        user.saved.map(
          ({
            name,
            experience,
            location,
            about,
            gallery,
            profession,
            _id,
            profilePicture,
          }) => (
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
    </motion.div>
  );
};

export default Saved;
