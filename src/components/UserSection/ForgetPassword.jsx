import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { forgetPassword,setNewPasswword } from '../../store/slice/userSlice';
function ForgetPassword({ isOpen, setIsOpen }) {
    const dispatch=useDispatch()
  const [contact, setContact] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(contact);

    let payload;
    if (isEmail) {
      payload = { email: contact};
    } else {
      payload = { whatsApp_Number: contact };
    }

const{loading, error,forgetPassword_Store,newPasswword}=useSelector((state)=>state.user)

const handleSendOtp = async () => {
  try {
    if (!contact) {
      setMessage('Please enter email or WhatsApp number');
      return;
    }

    const payload = contact.includes('@')
      ? { email: contact }
      : { whatsApp_Number: contact };

    const res = await dispatch(forgetPassword(payload));
console.log(res,"res")

if(res?.meta?.requestStatus=="fulfilled"){
setOtpSent(true);
      localStorage.setItem("contact-Sport-express", contact);
      setMessage("OTP sent successfully!");
}
   else {
      setMessage(res|| "Failed to send OTP");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    setMessage("Something went wrong. Please try again.");
  }
};


const handleResetPassword = async () => {
  try {
    if (!otp || !newPassword) {
      setMessage('Please enter OTP and new password');
      return;
    }

    const contact = localStorage.getItem('contact-Sport-express'); // Match key name exactly

    if (!contact) {
      setMessage('Contact information not found. Please request OTP again.');
      return;
    }

    // Construct the payload with OTP, new password, and contact (email or WhatsApp number)
    const payload = {
      otp,
      password: newPassword,
      ...(contact.includes('@')
        ? { email: contact }
        : { whatsApp_Number: contact }),
    }
    console.log(payload,"fkkhjiortir")
    // Dispatch the new password request
    const res = await dispatch( setNewPasswword(payload));

    if (res?.payload?.status === 200) {
      setMessage('Password reset successfully!');
      setContact('');
      setOtp('');
      setNewPassword('');
      setOtpSent(false);
      localStorage.removeItem('contact-Sport-express');
    } else {
      setMessage(res?.payload?.message || 'Failed to reset password.');
    }

  } catch (error) {
    console.error("Password reset error:", error);
    setMessage('Something went wrong. Please try again.');
  }
};


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={() => setIsOpen(false)}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forgot Password</h2>

        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="Email or WhatsApp number"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Reset Password
            </button>
          </>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
