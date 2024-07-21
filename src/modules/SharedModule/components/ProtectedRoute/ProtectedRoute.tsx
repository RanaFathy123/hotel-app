import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// Adjust the import path based on your project structure
import { ReactNode } from "react";
import { AuthContext } from "../../../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loginData } = useContext(AuthContext);

  if (localStorage.getItem("token") && loginData?.role == "admin") {
    return children;
  } else if (localStorage.getItem("token") && loginData?.role == "user") {
    return <Navigate to="/" />;
  } else {
    <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
