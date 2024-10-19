import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  // If token exists, redirect to dashboard, otherwise allow access to the route
  return accessToken ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;
