import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMeDetails } from '../store/slice/userSlice';
import LoginModal from '../components/UserSection/Login'; // assuming you have this component

function ProtectedRoutes() {
  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState(null);

  const { meDetails, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!meDetails?.email) {
      dispatch(getMeDetails());
    }
  }, [dispatch, meDetails?.email]);

  useEffect(() => {
    // If not logged in or error, open the login modal
    if ((!meDetails?.email || error) && !activeModal) {
    alert("First login")
      setActiveModal('login');
    }
  }, [meDetails, error, activeModal]);

  if (loading) return <div>Loading...</div>;

  if (activeModal === 'login') {

    return (
      <LoginModal
        isOpen={true}
        setIsOpen={() => setActiveModal()}
      />
    );
  }

  // If we get here and user is not logged in (no email), just redirect
  if (!meDetails?.email || error) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
}

export default ProtectedRoutes;
