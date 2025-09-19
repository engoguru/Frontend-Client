import React from 'react';
import { Link } from 'react-router-dom';

function HomePopular() {
  const popularCategories = [
    {
      title: 'Nutrition',
      image: 'https://content.jdmagicbox.com/comp/raipur-chhattisgarh/m9/9999px771.x771.200614175529.u5m9/catalogue/he-man-s-nutrition-raipur-chhattisgarh-0jwj6f3wfx.jpg',
      description: 'Top supplements and health boosters.',
    },
    {
      title: 'Apparel',
      image: 'https://cdn.mos.cms.futurecdn.net/2UYUXcj9Sk6ASGEytcQvLa.jpg',
      description: 'Train in style with performance gear.',
    },
    {
      title: 'Equipment',
      image: 'https://m.media-amazon.com/images/I/61nON0-SZhL.jpg',
      description: 'Durable tools for your fitness goals.',
    },
  ];

  return (
    <div className="w-full py-10 text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Products
      </h2>

      {/* Cards Grid */}
      <Link to={"/productViewAll"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCategories.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      </Link>
    </div>
  );
}

export default HomePopular;
