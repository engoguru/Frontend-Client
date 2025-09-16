import React, { useState } from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required.';
    if (!formData.message) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // form submission logic here
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      //reset form
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Hero Header */}
      <section className="bg-gray-100 py-8 mt-16 md:mt-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            We'd love to hear from you! Reach out with your questions, comments, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-red-500'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 ${errors.subject ? 'focus:ring-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 ${errors.message ? 'focus:ring-red-500' : 'focus:ring-red-500'}`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-1/3 mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
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
