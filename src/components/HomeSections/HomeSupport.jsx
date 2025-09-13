import React from 'react';

const supportItems = [
  {
    title: 'Free Shipping',
    description: 'For orders from $50',
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 16V6a1 1 0 011-1h13a1 1 0 011 1v10h-1a4 4 0 01-8 0H4a1 1 0 01-1-1z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16 16a4 4 0 108 0 4 4 0 00-8 0z" />
      </svg>
    ),
  },
  {
    title: 'Support 24/7',
    description: 'Call us anytime',
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18 13v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5M15 10a3 3 0 10-6 0v1a3 3 0 006 0v-1z" />
      </svg>
    ),
  },
  {
    title: '100% Safety',
    description: 'Only secure payments',
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 11c0-1.1.9-2 2-2h4a2 2 0 012 2v4c0 1.1-.9 2-2 2h-4a2 2 0 01-2-2v-4z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5 12h2a2 2 0 012 2v4a2 2 0 01-2 2H5v-8z" />
      </svg>
    ),
  },
  {
    title: 'Hot Offers',
    description: 'Discounts up to 90%',
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function HomeSupport() {
  return (
    <div className="w-full py-10 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        Why Shop With Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportItems.map((item, index) => (
          <div key={index} className="flex items-center bg-white shadow-md rounded-lg p-5 gap-4 hover:shadow-lg transition-shadow">
            <div>{item.icon}</div>
            <div>
              <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSupport;