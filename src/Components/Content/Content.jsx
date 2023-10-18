import React from "react";

const Content = () => {
  const backgroundImageUrl =
    "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  const images = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._R2B018NEBMuhXKO64x0fQHaE8%26pid%3DApi&f=1&ipt=8eb13777125dabbf3610e02e43ad0abd0719c50740787444687da1df6cd742c3&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.CYfApeDO-OfGycAEjdXOMQHaE8%26pid%3DApi&f=1&ipt=db62ccb3ddc6214b0805a97bdd60a8a7c85a613bae288a108a4e2feca644f7b8&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.P6U5nTaH_z-bRFXjWGITYgHaFj%26pid%3DApi&f=1&ipt=61227a9ac42940eaf172e92b09abb7f0882cd2947439a11b1d5e1ec7e46359bb&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.y-h8Oaqu-f5Vway1C3-izwHaE8%26pid%3DApi&f=1&ipt=5fca461a81debfadf11bfb2d5a722fd1e9009e2bd5b16092b1cb22fc286e3297&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.EZBX3AVUXtLUmmSY2HTwxgHaE8%26pid%3DApi&f=1&ipt=6fbac7cda2351324d23fd1870b7089d83f91865255e297d2fd4ab9a7525e582e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.X5aokbZwWwBsaLaSqnPetQHaE7%26pid%3DApi&f=1&ipt=f8af7e33fc599f31a2765aac294d331ad82380311d82a344d1accd04af532ce4&ipo=images",
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div
        className="bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})`, minHeight: "50vh" }}
      >
        <div className="w-full sm:w-auto sm:absolute" style={{ left: "2cm" }}>
          <input
            className="w-96 px-4 py-3 rounded-l-md border-2 border-r-0 border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search..."
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-md">
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${image})`,
              height: "200px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Content;
