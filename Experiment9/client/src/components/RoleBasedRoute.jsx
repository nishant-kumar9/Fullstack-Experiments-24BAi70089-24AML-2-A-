import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  const decoded = JSON.parse(atob(token.split(".")[1]));

  return decoded.role === role ? children : <h1>Access Denied</h1>;
}