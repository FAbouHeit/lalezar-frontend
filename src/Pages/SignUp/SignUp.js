import React, {useEffect,useContext, useState } from 'react'
import Styles from './Signup.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import OAuth from "../../Components/OAuth/OAuth.js";
import useApi from "../../Hooks/UseApi";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();
   const [phoneNumber,setPhoneNumber] = useState();
   const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false)
  const { fetchUserData } = useContext(AuthContext);
  const { apiCall } = useApi();
  const navigate = useNavigate();


  useEffect(()=>{
    if (success){
        // toast.success('Logged in Successfuly')
        console.log("sign up  Successfuly")
    }
  }, [success])

const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
      console.log("all fiels are required ")
      setLoading(false);
      return;
  }

  try {
         const response = await apiCall({
          url: 'user/signup',
          method: 'post',
          data: {firstName,lastName, email, password , phoneNumber }
      });

   if(response){
      await fetchUserData()
      console.log('sign up')
      setLoading(false);
      setSuccess(true)
      navigate('/home')
  }
}
  catch (error) {
      console.log(error)
      setLoading(false);
        // showToast('Error logging in');
  }
};

  
  return (
    <>
      <main className={Styles.mainContainer}>
        <section className={Styles.pageContainer}>
          <div className={Styles.div}>
            <h1 className={Styles.title}>Register your account</h1>
            <div className={Styles.linkPhrase}>
              <p className={Styles.p}>Already have one?</p> 
              <NavLink
                to="/Login" className={Styles.linkLogin}>
                login
              </NavLink>
            </div>
          </div>

          <div>
            <form className={Styles.formContainer} >
              <div className={Styles.inputContainer}>
                <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined"
                value={firstName} 
                onChange={(e)=>setFirstName(e.target.value)}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "1px solid #C86823 ",

                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }} />
                <TextField fullWidth id="outlined-basic" label=" Last Name" variant="outlined"
                value={lastName} 
                onChange={(e)=>setLastName(e.target.value)}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "1px solid #C86823 ",

                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }} />
                <TextField fullWidth id="outlined-basic" label="Email" variant="outlined"
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "1px solid #C86823 ",

                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }} />
                <TextField fullWidth id="outlined-basic" label="Password" variant="outlined"
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "1px solid #C86823 ",

                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }} />
                <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" 
                 value={phoneNumber} 
                 onChange={(e)=>setPhoneNumber(e.target.value)}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: "1px solid #C86823 ",

                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }} />
              </div>
              <div className={Styles.buttonContainer}>
                <Button
                  fullWidth
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
                  {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
                <p className={Styles.orPhrase}>Or</p>
               <OAuth/>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default SignUp;
