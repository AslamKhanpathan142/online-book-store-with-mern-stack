import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const role = localStorage.getItem("role");

  // If admin tries to access user pages → kick to AdminHome
  if (role === "admin") {
    return <Navigate to="/AdminHome" />;
  }
//   else if (role === "doctor") {
//     return <Navigate to="/DoctorAdmin" />;
//   }

  return children;
}

