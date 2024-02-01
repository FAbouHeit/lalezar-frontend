import React from "react";
import Styles from "./Login.module.css";
import{TextField,IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import OAuth from "../../Components/OAuth/OAuth.js";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import useApi from "../../Hooks/UseApi";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
  const { fetchUserData } = useContext(AuthContext);
  const { apiCall } = useApi();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  useEffect(() => {
    if (success) {
      toast.success("Logged in Successfuly");
    }
  }, [success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showToast("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await apiCall({
        url: "user/login",
        method: "post",
        data: { email, password },
      });

      if (response) {
        await fetchUserData();
        setLoading(false);
        setSuccess(true);
        showToast("Logged in successfully");
        navigate("/home", { state: { success: true } });
      } else {
        showToast("Email does not exist or Wrong Password");
        setLoading(false);
      }
    } catch (error) {
      // Handle specific errors based on status code, if needed
      if (error.response && error.response.status === 401) {
        showToast("Incorrect email or password");
      } else {
        showToast("Error logging in");
      }

      setLoading(false);
    }
  };

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <main className={Styles.mainContainer}>
        <section className={Styles.pageContainer}>
          <div className={Styles.div}>
            <h1 className={Styles.title}>Login to your account</h1>
            <div className={Styles.linkPhrase}>
              <p className={Styles.p}>Don't have one? </p>{" "}
              <NavLink to="/signup" className={Styles.linkLogin}>
                Sign Up
              </NavLink>
            </div>
          </div>
          <div>
            <form className={Styles.formContainer}>
              <div className={Styles.inputContainer}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null); // Clear previous error when typing
                  }}
                  onBlur={() => {
                    // Validate email on blur
                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                      email
                    );
                    if (!isValidEmail) {
                      setEmailError("Invalid email address");
                    }
                  }}
                  sx={{
                    "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                      border: "2px solid #C86823 !important",
                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #C86823 ",
                    },
                    "& .MuiInputLabel-root.Mui-focused ": {
                      color: "#C86823 ",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                style={{ color: "#C86823" }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                  sx={{
                    "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                      border: "2px solid #C86823 !important",
                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #C86823 ",
                    },
                    "& .MuiInputLabel-root.Mui-focused ": {
                      color: "#C86823 ",
                    },
                  }}
                />
              </div>
              <div className={Styles.buttonContainer}>
                <Button
                  variant="contained"
                  onClick={submitHandler}
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                      textTransform: 'none'
                    },
                  }}
                >
                  {loading === true ? "Logging in..." : "Login"}
                </Button>
                <p className={Styles.orPhrase}>Or</p>
                <OAuth isLogin={true}/>
              </div>
            </form>
          </div>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}

export default Login;
