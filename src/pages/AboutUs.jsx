import React, { useRef, useEffect } from 'react';
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
    {
      name: 'Chris Green',
      comment:
        'The variety of products is incredible. From apparel to nutrition, they have it all.',
      image: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    {
      name: 'Jessica Brown',
      comment:
        "My go-to store for all my sporting needs. The quality is always top-notch and the prices are unbeatable.",
      image: 'https://randomuser.me/api/portraits/women/58.jpg',
    },
    {
      name: 'Mark Wilson',
      comment:
        "I love the community feel and the helpful blog posts. It's more than just a store, it's a fitness hub!",
      image: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    {
      name: 'Sarah Davis',
      comment: 'The user interface is so easy to navigate. I found and ordered what I needed in minutes. Highly recommended!',
      image: 'https://randomuser.me/api/portraits/women/61.jpg',
    },
  ];

  const testimonialsRef = useRef(null);
  const intervalRef = useRef(null);

  const scrollTestimonials = (direction) => {
    if (testimonialsRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = testimonialsRef.current;
      const scrollAmount = clientWidth;

      if (direction === 'next') {
        // If we are on the last page, scroll to the beginning
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          testimonialsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else { // 'prev'
        // If we are at the beginning, scroll to the end
        if (scrollLeft <= 0) {
          testimonialsRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          testimonialsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  const stopAutoScroll = () => clearInterval(intervalRef.current);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => scrollTestimonials('next'), 5000); // Scroll every 5 seconds
  };

  const handleManualScroll = (direction) => {
    scrollTestimonials(direction);
    startAutoScroll(); // Reset timer on manual click
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Banner */}
      <section className="relative w-full h-64 md:h-96" style={{ marginTop: 'var(--navbar-height, 64px)' }}>
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
        <div className="relative">
          <div
            ref={testimonialsRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="snap-start w-full md:w-1/2 flex-shrink-0 px-4"
              >
                <div
                  className="bg-white p-6 rounded-lg shadow flex items-start space-x-4 h-full"
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
              </div>
            ))}
          </div>
          {/* Prev Button */}
          <button
            onClick={() => handleManualScroll('prev')}
            aria-label="Previous Testimonials"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2"
          >
            <svg className="h-6 w-6 md:h-8 md:w-8 text-gray-500 hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Next Button */}
          <button
            onClick={() => handleManualScroll('next')}
            aria-label="Next Testimonials"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2"
          >
            <svg className="h-6 w-6 md:h-8 md:w-8 text-gray-500 hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <FooterMain />
    </>
  );
}

export default AboutUs;
