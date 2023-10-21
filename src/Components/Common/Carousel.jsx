import React, { useState, useEffect } from "react";

const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Jane Doe",
    image: "https://via.placeholder.com/150",
    review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: 3,
    name: "Alex Smith",
    image: "https://via.placeholder.com/150",
    review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === reviewsData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? reviewsData.length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === reviewsData.length - 1 ? 0 : current + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="w-full max-w-screen-lg mx-auto relative">
      {reviewsData.map((review, index) => (
        <div
          key={review.id}
          className={index === current ? "opacity-100" : "opacity-0 absolute"}
        >
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={review.image}
                  alt={review.name}
                />
              </div>
              <p className="text-lg text-center">{review.review}</p>
              <p className="mt-2 text-gray-500">- {review.name}</p>
            </div>
          </div>
        </div>
      ))}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-4 rounded-full hover:bg-gray-800 transition-colors"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-4 rounded-full hover:bg-gray-800 transition-colors"
        onClick={nextSlide}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
