import React from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function AboutUs() {
  const teamMembers = [
    {
      name: 'Alice Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Visionary leader passionate about fitness and wellness.',
    },
    {
      name: 'Michael Lee',
      role: 'Chief Marketing Officer',
      image: 'https://randomuser.me/api/portraits/men/34.jpg',
      bio: 'Expert in digital marketing and branding strategy.',
    },
    {
      name: 'Sophia Martinez',
      role: 'Product Manager',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Drives product development and innovation.',
    },
  ];

  const testimonials = [
    {
      name: 'David Smith',
      comment:
        'FitStore changed the way I shop for gear. Amazing customer service and fast delivery!',
      image: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      name: 'Emily Taylor',
      comment:
        'Top-quality products with great discounts. I always find what I need here.',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
    },
  ];

  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Banner */}
      <section className="relative w-full h-64 md:h-96">
        <img
          src="https://red-parts.react.themeforest.scompiler.ru/themes/red/images/finder.jpg"
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            About Us
          </h1>
        </div>
      </section>

      {/* About Company */}
      <section className="py-12 px-6 max-w-[2400px] mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-600 text-md leading-7 max-w-3xl mx-auto">
          FitStore is your one-stop destination for fitness, sports, and wellness essentials. We believe in making
          fitness accessible and enjoyable for everyone. Whether you're a professional athlete or just getting started
          on your fitness journey, our curated range of products, expert support, and fast delivery help you stay on
          track.
        </p>
      </section>

      {/* Dedicated Team */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-red-600 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex items-start space-x-4"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                <p className="mt-2 font-semibold text-gray-800">- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterMain />
    </>
  );
}

export default AboutUs;
