import React from 'react'
import Styles from './Login.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OAuth from "../../Components/OAuth/OAuth.js"
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <>
    <main className={Styles.mainContainer}>
      <section className={Styles.pageContainer}>
      <div>
          <h1 className={Styles.title}>Login to your account</h1>
          <div className={Styles.linkPhrase}>
          <p className={Styles.p}>Don't have one? </p> <NavLink
              to="/signup" className={Styles.linkLogin}>
              Sign Up
            </NavLink>
            </div>
        </div>
        <div>
      <form className={Styles.formContainer} >
        <div className={Styles.inputContainer}>
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
              Login
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

export default Login
