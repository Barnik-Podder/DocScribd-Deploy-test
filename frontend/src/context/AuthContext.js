import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token",{Domain:"docscribd-deploy-test.onrender.com"}]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URI}/authuser`,
          {},
          { withCredentials: true }
        );

        const { status, name, role, id } = data;

        if (status) {
          setUsername(name);
          setRole(role);
          setId(id);
          // if (!username) {
          // }
          toast.success(`Welcome back ${name} !`, { position: "top-center" });

        } else {
          removeCookie("token");
          setUsername("");
          setRole("")
          setId("")

        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        setUsername("");
        setRole("")
        setId("")

      } finally {
        setIsLoading(false);
      }
    };

    verifyCookie();
  }, [cookies, username, removeCookie]);

  const logout = () => {
    removeCookie("token");
    setRole("")
    setId("")
    setUsername("");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ username, role, id, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
