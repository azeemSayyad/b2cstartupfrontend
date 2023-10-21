import React from "react";

const CustomCard = () => {
  return (
    <div className="bg-gray-300 border border-gray-400 p-4 hover:bg-gray-400 transition duration-300 ease-in-out" style={{ paddingTop: '100%' }}>
      <p className="text-gray-800 text-lg text-center">Card Content</p>
      <p className="text-gray-600 text-center">Add your content here to make it look visually appealing and informative.</p>
    </div>
  );
};

const boxContents = () => {
  const renderGrid = () => {
    const cards = [];
    const totalCards = 8; // 2 rows, 4 columns

    for (let i = 0; i < totalCards; i++) {
      cards.push(<CustomCard key={i} />);
    }
    return cards;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {renderGrid()}
      </div>
    </div>
  );
};

export default boxContents;
