import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import { LoadingButton } from "@mui/lab";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  }); 

  const { name, email, phone, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Starting email");
      emailjs.sendForm(
        `${process.env.REACT_APP_SERVICE_ID}`,
        `${process.env.REACT_APP_TEMPLATE_ID}`,
        e.target,
        `${process.env.REACT_APP_PUBLIC_KEY}`
      );
      setLoading(false);
      resetForm()
      console.log("Ending email");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error ocured");
    }
  };

  return (
    <div className={styles.contactPage}>
      <h1 className={styles.title}>Contact Us</h1>
      <main className={styles.contactContainer}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.contactForm}>
            <div className={styles.inputsHolder}>
              <TextField
                required
                fullWidth
                helperText="Please enter your full name"
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                value={name}
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
                required
                fullWidth
                helperText="Please Ensure it's a valid email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={(e) => handleChange(e)}
                value={email}
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
                required
                fullWidth
                helperText="Please enter number plus Country Code"
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                name="phone"
                onChange={(e) => handleChange(e)}
                value={phone}
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
            <div className={styles.msgHolder}>
              <TextField
                required
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={10}
                variant="outlined"
                name="message"
                onChange={(e) => handleChange(e)}
                value={message}
                sx={{
                  width: "100%",
                  height: "90%",
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C86823",
                    height: "100%",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#C86823",
                  },
                }}
              />
            </div>
            <div className={styles.btnHolder}>
              {loading ? (
                <LoadingButton />
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  Send Message
                </Button>
              )}
            </div>
            {error ? <p>An error occured, email wasn't sent</p> : ""}
          </div>
        </form>
        <section className={styles.contactNb}>
          <article className={styles.callUs}>
            <div className={styles.contactTitles}>
              <span className={styles.imgHolder}>
                {" "}
                <CallIcon />{" "}
              </span>{" "}
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                Call To Us
              </h4>
            </div>
            <p className={styles.textHolder}>
              {" "}
              <span className={styles.imgHolderX}> </span>We are available 7
              days a week.
            </p>
            <p className={styles.textHolder}>Phone: +961000000</p>
          </article>
          <article className={styles.msgUs}>
            <div className={styles.contactTitles}>
              <span className={styles.imgHolder}>
                {" "}
                <MailOutlineIcon />{" "}
              </span>{" "}
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                Write To Us
              </h4>
            </div>
            <p className={styles.textHolder}>
              {" "}
              <span className={styles.imgHolderX}> </span>Fill out our form and
              we will contact you within 24 hours.
            </p>
            <p className={styles.textHolder}>Emails: customer@exclusive.com</p>
            <p className={styles.textHolder}>Emails: support@exclusive.com</p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
