import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  // If token is present, allow access, otherwise redirect to login
  return accessToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
