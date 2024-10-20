import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem('userId');

  // If token exists, redirect to dashboard, otherwise allow access to the route
  return accessToken ? <Navigate to={`/profile/${userId}`} /> : children;
};

export default PublicRoute;
