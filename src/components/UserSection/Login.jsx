import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';

const LoginModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const { loading: userLoading, error: userError } = useSelector((state) => state.user);

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(contact);

    let payload;
    if (isEmail) {
      payload = { email: contact, password };
    } else {
      payload = { whatsApp_Number: contact, password };
    }

    try {
     const result= await dispatch(userLogin(payload)).unwrap();
     console.log(result,"dffhfvv")
      toast.success('Login successful!');
      setIsOpen(false); // close modal
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Invalid credentials. Please try again.',err);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000054] px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email or WhatsApp Number */}
          <input
            type="text"
            placeholder="Email or WhatsApp Number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={userLoading}
          >
            {userLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Error Message */}
          {userError && <p className="text-red-500 text-sm">{userError}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
