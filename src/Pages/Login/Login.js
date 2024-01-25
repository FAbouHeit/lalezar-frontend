import React from "react";
import Styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OAuth from "../../Components/OAuth/OAuth.js";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Password } from "@mui/icons-material";
import { useState, useContext , useEffect } from "react";
import useApi from "../../Hooks/UseApi";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";




function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false)
  const { fetchUserData } = useContext(AuthContext);
  const { apiCall } = useApi();
  const navigate = useNavigate();

//   const queryClient = useQueryClient();

// const loginMutation = useMutation(
//   async({email,password}) =>{
//     const response = await axios.post(
//       `${process.env.React_APP_BACKEND_ENDPOINT}login`,
//       {email,password}
//     );
//     return response.data;
//   },
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries('userLoginData');
//     },
//   }
// );

// const {
//   isFetching: isLoginFetching,
//   error: loginError,
//   refetch: refetchLogin,
// } = useQuery({
//   queryKey: ['loginData', email, password], // Include parameters in the query key
//   queryFn: async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_ENDPOINT}login`,
//         { email, password }
//       );

//       // Assuming your backend returns user data upon successful login
//       const user = response.data;

//       // Handle successful login, you may want to store user data in state or context
//       console.log('User logged in:', user);

//       // Return some data to indicate success if needed
//       return { success: true };
//     } catch (error) {
//       console.error('Error logging in:', error);
//       throw error;
//     }
//   },
//   enabled: false, // Do not automatically fetch data on mount
// });

// const handleLogin = () => {
//   // Trigger the login query
//   refetchLogin();
// };
useEffect(()=>{
  if (success){
      // toast.success('Logged in Successfuly')
      console.log("Logged in Successfuly")
  }
}, [success])

const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (!email || !password) {
      console.log("ENTER EMAIL OR PASSWORD")
      setLoading(false);
      return;
  }

  try {
        await apiCall({
          url: 'user/login',
          method: 'post',
          data: { email, password }
      })
   
      await fetchUserData()
      setLoading(false);
      setSuccess(true)
      navigate('/home')
  }
  catch (error) {
      console.log(error)
      setLoading(false);
  }
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                    },
                  }}
                >
                  {loading === true ? 'Logging in...' : 'Login'}
                </Button>
                <p className={Styles.orPhrase}>Or</p>
                <OAuth />
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
