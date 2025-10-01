import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAuth }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (requireAuth && !isLoggedIn) {
    // Needs auth but not logged in → send to login page
    return <Navigate to="/Login" />;
  }

  if (!requireAuth && isLoggedIn) {
    // Logged in but visiting login/register → send to profile
    return <Navigate to="/UserProfile" />;
  }

  return children;
};

export default ProtectedRoute;
