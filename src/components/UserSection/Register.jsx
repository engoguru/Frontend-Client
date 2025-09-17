import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, userOtpVerify } from '../../store/slice/userSlice';

function Register({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState(''); // Single field for email or WhatsApp
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    contactNumber: '',
    gender: '',
    address: [''],
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [contactMethod, setContactMethod] = useState({}); // to store identified method

  const { loading, error, user } = useSelector((state) => state.user);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData((prev) => ({ ...prev, address: [value] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine whether contact is email or WhatsApp
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(contact);
    const isPhone = /^[1-9]\d{9,14}$/.test(contact);

    if (!isEmail && !isPhone) {
      toast.error('Please enter a valid email or WhatsApp number.');
      return;
    }

    const payload = {
      ...formData,
      password: formData.password,
      ...(isEmail ? { email: contact } : { whatsApp_Number: contact }),
    };

    try {
      const result = await dispatch(userRegister(payload)).unwrap();
      if (result?.status === 201) {
        toast.success('OTP has been sent');
        setOtpSent(true);
        setContactMethod(isEmail ? { email: contact } : { whatsApp_Number: contact });
      }
    } catch (err) {
      toast.error('Failed to send OTP. Please try again.');
      console.error('Register error:', err);
    }
  };

  // Handle OTP Submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        otp,
        ...contactMethod,
      };

      await dispatch(userOtpVerify(payload)).unwrap();
      toast.success('OTP verified');
      setIsOpen(false);
    } catch (err) {
      toast.error('OTP verification failed');
      console.error('OTP verification error:', err);
    }
  };

  // Close modal on outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center bg-[#00000054]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-500 absolute top-3 right-4 font-bold text-lg"
        >
          ✕
        </button>

        {!otpSent ? (
          <>
            <h2 className="text-lg font-semibold mb-3">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />

              <Input
                label="Email or WhatsApp Number"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />

              <Input label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />

              <div className="flex flex-row gap-x-4">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <div className="w-1/3 mt-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="NA">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <Input
                label="OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

const Input = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 p-2 rounded"
    />
  </div>
);

export default Register;
