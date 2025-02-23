import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { username } = useContext(AuthContext);
  return username ? <Navigate to="/" /> : children;
};
