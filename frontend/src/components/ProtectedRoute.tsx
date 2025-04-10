import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import

interface DecodedToken {
  sub: string,
  name: string,
  admin: boolean,
  iat: number
  // Include other claims here as needed
}

const getUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);  // Decode the JWT
      console.log("Decoded JWT:", decoded);  // For debugging
      return decoded.admin ? "admin" : "user";  // Return "admin" if admin is true, else "user"
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  const userRole = getUserRole(); // Get the user's role from the JWT
  console.log("User Role:", userRole); // For debugging

  // If a role is passed in and the user's role doesn't match, redirect to "unauthorized"
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
