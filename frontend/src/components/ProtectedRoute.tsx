import React from "react";
import { Navigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string; // Optional role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  const user = parseJwt(token);

  if (!user) {
    return <Navigate to="/unauthorized" />;
  }

  console.log('User Role:', user.role);
  console.log('Required Role:', role);

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
