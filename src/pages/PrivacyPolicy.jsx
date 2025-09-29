import React from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function PrivacyPolicy() {
  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Hero Header */}
      <section className="bg-gray-100 py-8" style={{ marginTop: 'var(--navbar-height, 64px)' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Main Privacy Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-gray-700 space-y-8 text-sm md:text-base leading-7">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">1. Information Collection</h2>
          <p>
            We collect personal information that you provide to us such as name, address, contact details, payment information,
            and any other data you voluntarily submit.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">2. Use of Information</h2>
          <p>
            Your information is used to process orders, provide customer service, send updates, and improve our services.
            We may also use your data for marketing, but only with your consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Cookies and Tracking</h2>
          <p>
            We use cookies to personalize your experience, analyze traffic, and improve website performance. You can disable cookies
            in your browser settings at any time.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Data Sharing</h2>
          <p>
            We do not sell your personal information. We only share it with trusted third parties who assist us in operating our website
            and fulfilling your orders, under strict confidentiality agreements.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. To make such a request, contact us at the details below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">6. Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information, including encryption
            and secure server hosting.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">7. Policy Changes</h2>
          <p>
            We may update this privacy policy from time to time. All changes will be posted on this page with an updated revision date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
            <br />
            Email: support@example.com
            <br />
            Phone: (123) 456-7890
          </p>
        </div>
      </section>

      <FooterMain />
    </>
  );
}

export default PrivacyPolicy;
