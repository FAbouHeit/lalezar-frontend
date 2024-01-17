import React from "react";
import styles from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.svg";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.links}>
            <div className={styles.linksColumn}>
              <img src={logo} alt="Logo" className={styles.logo} />
              <p className={styles.p}>
                Explore the essence of Lebanon with our authentic spices,
                delivered worldwide for a flavorful journey in every dish.
              </p>
              <div className={styles.socials}>
                <Link to="www.facebook.com" className={`${styles.socialIcon}`}>
                  <FacebookRoundedIcon />
                </Link>
                <Link to="www.Instagram.com" className={`${styles.socialIcon}`}>
                  <InstagramIcon />
                </Link>
                <Link to="" className={`${styles.socialIcon}`}>
                  <WhatsAppIcon />
                </Link>
              </div>
            </div>
            <div className={`${styles.linksColumn} ${styles.middle}`}>
              <h2 className={styles.h2}>Pages</h2>
              <Link className={styles.link} to={"/"}>
                Home
              </Link>
              <Link className={styles.link} to={"/ProductsPage"}>
                Products
              </Link>
              <Link className={styles.link} to={"/BlogsPage"}>
                Blogs
              </Link>
              <Link className={styles.link} to={"/AboutUs"}>
                About Us
              </Link>
            </div>
            <div className={`${styles.linksColumn} ${styles.right}`}>
              <h2 className={styles.h2}>Help</h2>
              <Link className={styles.link} to={"/Profile"}>
                My Account
              </Link>
              <Link className={styles.link} to={"/Cart"}>
                My Cart
              </Link>
              <Link className={styles.link} to={"/BlogsPage"}>
                Contact Us
              </Link>
              <Link className={styles.link} to={"/PrivacyPolicy"}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 All rights reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
