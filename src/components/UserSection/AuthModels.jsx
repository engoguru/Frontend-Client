import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthModals = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false); // close register
    setIsLoginOpen(true);     // open login
  };

  const openRegister = () => {
    setIsLoginOpen(false);    // close login
    setIsRegisterOpen(true);  // open register
  };

  return (
    <div>
      <button onClick={openLogin} className="mr-4 px-4 py-2 bg-blue-600 text-white rounded">
        Open Login Modal
      </button>
      <button onClick={openRegister} className="px-4 py-2 bg-green-600 text-white rounded">
        Open Register Modal
      </button>

      <LoginModal
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        openRegister={openRegister} // pass function to open register modal
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        openLogin={openLogin}       // pass function to open login modal
      />
    </div>
  );
};

export default AuthModals;
