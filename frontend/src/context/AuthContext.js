import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token", "role"]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Prevents early token deletion

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token || !cookies.role) {
        setIsLoading(false);
        return;
      }

      try {
        const endpoint = cookies.role === "Patient" ? "/authuser" : "/authclinic";
        const { data } = await axios.post(
          `http://localhost:5000${endpoint}`,
          {},
          { withCredentials: true }
        );

        const { status, user, clinic } = data;

        if (status) {
          const name = cookies.role === "Patient" ? user : clinic;
          setUsername(name);
          toast.success(`Welcome back ${name} !`, { position: "top-center" });

        } else {
          removeCookie("token");
          removeCookie("role");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        removeCookie("role");
      } finally {
        setIsLoading(false);
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    setUsername("");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Prevents flashing before auth check
  }

  return (
    <AuthContext.Provider value={{ username, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
