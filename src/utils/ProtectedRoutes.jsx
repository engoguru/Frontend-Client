import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMeDetails } from '../store/slice/userSlice';
import LoginModal from '../components/UserSection/Login';
import { toast } from 'react-toastify';

function ProtectedRoutes() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const { meDetails, loading, error } = useSelector((state) => state.user);
// const  [show,setShow]=u


  if (loading) return <div>Loading...</div>;

  // If user not authenticated and modal is not being used, fallback redirect
  if (!meDetails?.email && !showModal) {

    return <Navigate to="/" replace />;
  }

  return (
    <>

      {/* If logged in, show route */}
      {meDetails?.email && <Outlet />}
    </>
  );
}

export default ProtectedRoutes;
