import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { username } = useContext(AuthContext);
  return username ? <Navigate to="/" /> : children;
};
export const LoginProtectedRoute = ({ children }) => {
  const { username } = useContext(AuthContext);
  return username ? children : <Navigate to="/login" />;
};
export const RoleProtectedRoute = ({ children }) => {
  const { role, id } = useContext(AuthContext);
  return role === "Clinic" ? <Navigate to={"/dashboard/" + id} /> : children;
};
