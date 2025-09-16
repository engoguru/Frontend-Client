import React from 'react';
import NavbarTop from '../components/Navbar/NavbarTop';
import NavbarBottom from '../components/Navbar/NavbarBottom';
import FooterMain from '../components/Footer/FooterMain';

function TermCondition() {
  return (
    <>
      <NavbarTop />
      <NavbarBottom />

      {/* Hero Section */}
      <section className="bg-gray-100 py-8 mt-16 md:mt-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Terms & Conditions</h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-gray-700 space-y-8 text-sm md:text-base leading-7">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">1. Introduction</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">2. Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, compilation, and other matters related to the site are protected under applicable copyrights,
            trademarks, and other proprietary rights.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Use of Site</h2>
          <p>
            You may use the Service only for lawful purposes and in accordance with these Terms.
            You agree not to use the Service in any way that violates any applicable national or international law or regulation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Limitation of Liability</h2>
          <p>
            In no event shall our company, its directors, employees, or agents, be liable for any indirect, incidental, special,
            consequential or punitive damages arising out of your access to, or use of, the website or services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change
            will be determined at our sole discretion.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">6. Contact Information</h2>
          <p>
            For any questions about these Terms, please contact us at:
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

export default TermCondition;
