import { useState, useEffect, createContext } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [userUpdated , setUserUpdated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && user === null) {
      fetchUserData();
    }
  }, [user, userUpdated]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.get("user/logged-in-user");
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  const logOut = async () => {
    await axiosInstance.post("user/logout");
    setUser(null);
    navigate('/')
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        checkUser,
        setUser,
        logOut,
        fetchUserData,
        setUserUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
