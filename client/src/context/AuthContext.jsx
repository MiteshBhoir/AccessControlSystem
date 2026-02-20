import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const AppContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  //new
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [aadhar, setAadhar] = useState("")



  //  Fetch logged-in user

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/data");
      setUser(data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };
  


  const resetAuthForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAadhar("");
    setState("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
    setOpen(false);
  };

  const LoginSubmitHandler = async (e) => {
    e.preventDefault()
    const endpoint = state === "login" ? "/login" : "/register"
    const payload =
      state === "login"
        ? { email, password }
        : { name, email, password, aadhar }

    try {
      await toast.promise(
        api.post(endpoint, payload),
        {
          loading: state === "login" ? "Logging in..." : "Registering...",
          success: (res) => {
            if (state === "login") {
              localStorage.setItem("token", res.data.token)
              setShowLogin(false)
              resetAuthForm();
              return "Login successful 🎉"
            } else { 
              resetAuthForm();
              setState("login")
              return "Registration successful. Please login"
            }
          },
          error: (err) =>
            err.response?.data?.message || "Something went wrong."
        }
      )
      setShowLogin(false)
    } catch (err) {
      console.error(err)
    }
  }
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/data");
        setUser(data);
        toast.success("Profile loaded successfully 👤");
      } else {
        toast.error("You must login first");
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile.");
    }
  };
  // 🔹 Auto-login on refresh
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);
  return (
    <AppContext.Provider
      value={{
        showLogin, setShowLogin,
        open, setOpen, navigate, token, handleLogout,
        state, setState, name, setName, email, setEmail, password, setPassword, aadhar, setAadhar, LoginSubmitHandler,
        fetchProfile, resetAuthForm, setUser, user
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🔹 Custom hook
export const useAppContext = () => useContext(AppContext);
