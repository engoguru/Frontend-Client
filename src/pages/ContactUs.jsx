import React, { useEffect, useState } from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';
import { useSelector, useDispatch } from 'react-redux';
import { submitContact } from '../store/slice/contactSlice';
import { getMeDetails } from '../store/slice/userSlice';

function ContactUs() {
  const dispatch = useDispatch();
  const { meDetails } = useSelector((state) => state.user);

  const [formdata, setFormdata] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Sync form data when meDetails changes
  useEffect(() => {
    if (meDetails) {
      setFormdata((prev) => ({
        ...prev,
        name: meDetails?.name || '',
        phone: meDetails?.contactNumber || '',
        email: meDetails?.email || ''
      }));
    }
  }, [meDetails]);

  useEffect(() => {
    dispatch(getMeDetails());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting formdata:', formdata);

    // Validate before submitting (optional)
    if (!formdata.name || !formdata.email || !formdata.message) {
      alert("Please fill in all requiregrttrrtd fields.");
      return;
    }

    dispatch(submitContact(formdata));
  };

  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Hero Header */}
      <section className="bg-gray-100 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            We'd love to hear from you! Reach out with your questions, comments, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Map + Address */}
        <div className="space-y-6">
          <div className="w-full h-64 md:h-72">
            <iframe
              title="Google Map"
              className="w-full h-full rounded-md shadow"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>

          <div className="text-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-left">Our Address</h2>
            <div className="text-left space-y-1">
              <p>🏢 FitStore HQ</p>
              <p>📍 123 Fitness Avenue</p>
              <p>🏙️ Muscle Town, NY 10001</p>
              <p>🇺🇸 United States</p>
              <p>📞 Phone: (123) 456-7890</p>
              <p>✉️ Email: support@fitstore.com</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={handleChange}
                name="name"
                type="text"
                value={formdata.name}
                placeholder="Your Name"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                onChange={handleChange}
                name="phone"
                type="tel"
                value={formdata.phone}
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={formdata.email}
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              onChange={handleChange}
              name="subject"
              type="text"
              value={formdata.subject}
              placeholder="Subject"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              onChange={handleChange}
              name="message"
              value={formdata.message}
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="w-full mt-4 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      <FooterMain />
    </>
  );
}

export default ContactUs;
