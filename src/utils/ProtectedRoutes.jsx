import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMeDetails } from '../store/slice/userSlice';
import LoginModal from '../components/UserSection/Login';

function ProtectedRoutes() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const { meDetails, loading, error } = useSelector((state) => state.user);

  // Fetch user details once
  useEffect(() => {
    if (!meDetails?.email && !loading) {
      dispatch(getMeDetails());
    }
  }, [dispatch, meDetails?.email, loading]);

  // Show login modal if user is not authenticated
  useEffect(() => {
    if (!meDetails?.email && !loading) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [meDetails?.email, loading]);

  if (loading) return <div>Loading...</div>;

  // If user not authenticated and modal is not being used, fallback redirect
  if (!meDetails?.email && !showModal) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {showModal && (
        <LoginModal
          isOpen={showModal}
          setIsOpen={(val) => setShowModal(val)}
        />
      )}
      {/* If logged in, show route */}
      {meDetails?.email && <Outlet />}
    </>
  );
}

export default ProtectedRoutes;
