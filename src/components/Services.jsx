import React from "react";

const Services = () => {
  const adultClasses = ["Yoga", "Dance Fitness", "Contemporary Dance", "Freestyle Dance", "Calisthenics", "Pilates"];
  const kidsClasses = ["Yoga", "Gymnastics", "Contemporary", "Freestyle", "Hip Hop"];

  return (
    <div className="py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-12">Our Classes</h2>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Adults</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {adultClasses.map((cls, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold mb-2">{cls}</h4>
              <p className="text-gray-600">Description for {cls} class...</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">Kids</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {kidsClasses.map((cls, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold mb-2">{cls}</h4>
              <p className="text-gray-600">Description for {cls} class...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-green-700 font-semibold">
        Contact us if you want to start classes in your society.
      </div>
    </div>
  );
};

export default Services;
