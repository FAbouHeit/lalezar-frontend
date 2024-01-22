import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.svg";

function Footer() {
  const [isActive, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultActiveLink = "/";
    const activeLink = window.location.pathname || defaultActiveLink;

    const activeIndex = [
      "/",
      "/ProductsPage",
      "/BlogsPage",
      "/AboutUs",
      "/Profile",
      "/Cart",
      "/ContactUs",
      "/PrivacyPolicy",
    ].indexOf(activeLink);

    setActive((prev) => {
      const newActive = Array(7).fill(false);
      newActive[activeIndex] = true;
      return newActive;
    });

    navigate(activeLink);
  }, [navigate]);

  const handleLinkClick = (index, path) => {
    setActive((prev) => {
      const newActive = Array(7).fill(false);
      newActive[index] = true;
      return newActive;
    });

    navigate(path);
  };
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
              <p className={styles.h2}>Pages</p>
              <NavLink
                to={"/"}
                onClick={() => handleLinkClick(0, "/home")}
                className={isActive[0] ? styles.activeLink : styles.link}
              >
                Home
              </NavLink>
              <NavLink
                className={isActive[1] ? styles.activeLink : styles.link}
                to={"/ProductsPage"}
                onClick={() => handleLinkClick(1, "/ProductsPage")}
              >
                Products
              </NavLink>
              <NavLink
                className={isActive[2] ? styles.activeLink : styles.link}
                to={"/BlogsPage"}
                onClick={() => handleLinkClick(2, "/BlogsPage")}
              >
                Blogs
              </NavLink>
              <NavLink
                className={isActive[3] ? styles.activeLink : styles.link}
                to={"/AboutUs"}
                onClick={() => handleLinkClick(3, "/AboutUs")}
              >
                About Us
              </NavLink>
            </div>
            <div className={`${styles.linksColumn} ${styles.right}`}>
              <p className={styles.h2}>Help</p>
              <NavLink
                className={isActive[4] ? styles.activeLink : styles.link}
                to={"/Profile"}
                onClick={() => handleLinkClick(4, "/Profile")}
              >
                My Account
              </NavLink>
              <NavLink
                className={isActive[5] ? styles.activeLink : styles.link}
                to={"/Cart"}
                onClick={() => handleLinkClick(5, "/Cart")}
              >
                My Cart
              </NavLink>
              <NavLink
                className={isActive[6] ? styles.activeLink : styles.link}
                to={"/ContactUs"}
                onClick={() => handleLinkClick(6, "/ContactUs")}
              >
                Contact Us
              </NavLink>
              <NavLink
                className={isActive[7] ? styles.activeLink : styles.link}
                to={"/PrivacyPolicy"}
                onClick={() => handleLinkClick(7, "/PrivacyPolicy")}
              >
                Privacy Policy
              </NavLink>
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
