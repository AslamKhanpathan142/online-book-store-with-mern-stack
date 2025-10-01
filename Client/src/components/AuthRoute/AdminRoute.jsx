import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const role = localStorage.getItem("role");

  // If admin tries to access user routes, redirect to Admin page
  if (role !== "admin") {
    window.dispatchEvent(new Event("auth"));
    return <Navigate to="/Login" />;
  }

  return children; // Normal users can access
}