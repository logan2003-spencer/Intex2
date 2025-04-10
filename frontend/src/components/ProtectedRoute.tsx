import React from "react";
import { Navigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  const user = parseJwt(token);

  // If role is required and user role doesn't match
  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;