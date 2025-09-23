import React from "react";


const ComingSooon = () => {
  return (
     <section className="w-full px-4 py-32 text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold mb-16">Coming Soon!</h2>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center  ">
        <img
          src={'/lake-city.webp'}
          alt="Coming soon left"
          className="w-full max-w-xl h-auto object-cover rounded-lg"
        />
        <img
          src={'/fsd.webp'}
          alt="Coming soon right"
          className="w-full max-w-xl h-auto object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default ComingSooon;
