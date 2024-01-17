import React from 'react'
import styles from './ContactUs.module.css'
import emailIcon from "../../Assets/email.png"
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/material/Button';

function ContactUs() {
  return (
    <div className={styles.contactPage}>
      <h1 className={styles.title}>Contact Us</h1>
      <main className={styles.contactContainer}>
        <form className={styles.form} action="/" method='POST' name="contact">
          <div className={styles.contactForm}>

            <div className={styles.inputsHolder}>
              <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" sx={{
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
              <TextField fullWidth id="outlined-basic" label="Phone" variant="outlined" sx={{
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
            <div className={styles.msgHolder}>
              <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={10}
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '90%',
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
                    border: '2px solid #C86823 !important',
                    borderRadius: '4px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #C86823',
                    height: '100%',
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: '#C86823',
                  },
                }}
              />
            </div>
            <div className={styles.btnHolder}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#C86823",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    bgcolor: "#e8833aef",
                    color: "#C86823",
                  },
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </form>
        <section className={styles.contactNb}>
          <article className={styles.callUs}>
            <div className={styles.contactTitles}>
              <span className={styles.imgHolder}> <CallIcon /> </span> <h4 style={{
                margin: 0,
                padding: 0
              }}>Call To Us</h4>
            </div>
            <p className={styles.textHolder}> <span className={styles.imgHolderX}> </span>We are available 7 days a week.</p>
            <p className={styles.textHolder}>Phone: +961000000</p>
          </article>
          <article className={styles.msgUs}>
            <div className={styles.contactTitles}><span className={styles.imgHolder}> <MailOutlineIcon /> </span> <h4 style={{
              margin: 0,
              padding: 0
            }}>Write To Us</h4>
            </div>
            <p className={styles.textHolder}> <span className={styles.imgHolderX}> <img src={emailIcon} alt="Message Icon" /> </span>Fill out our form and we will contact you within 24 hours.</p>
            <p className={styles.textHolder}>Emails: customer@exclusive.com</p>
            <p className={styles.textHolder}>Emails: support@exclusive.com</p>
          </article>
        </section>
      </main>
    </div>
  )
}

export default ContactUs
