import React from 'react'
import Styles from './Signup.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
function SignUp() {
  return (
    <>
      <main className={Styles.pageContainer}>
        <form className={Styles.formContainer} >
          <div>
            <h1 className={Styles.title}>Register your account</h1>
            <div className={Styles.linkPhrase}>
            <p>Already have one?</p> <NavLink
                to="/AboutUs" className={Styles.linkLogin}>
                login
              </NavLink>
              </div>
          </div>
          <div className={Styles.inputContainer}>
          <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined" sx={{
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
      <TextField fullWidth id="outlined-basic" label=" Last Name" variant="outlined" sx={{
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
           <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" sx={{
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
           <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" sx={{
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
             <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" sx={{
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
                variant="contained"
                sx={{
                  bgcolor: "#C86823",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    bgcolor: "#A0471D",
                    color: "white",
                  },
                }}
              >
                Sign Up
              </Button>
              <p className={Styles.orPhrase}>Or</p>
              <Button
                  variant="outlined"
                  sx={{
                    color: "#C86823",
                    borderColor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    // width:"100px",
                    "&:hover": {
                      bgcolor: "#A471D",
                      color: "white",
                    },
                  }}
                >
                  SignUp with Google
                </Button>
          </div>
        </form>
      </main>
    </>
  )
}

export default SignUp
