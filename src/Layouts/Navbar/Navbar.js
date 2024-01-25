import React from "react";
import Stack from "@mui/material/Stack";
import Styles from "./Navbar.module.css";
import logo from "../../Assets/logo.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Navbar() {
  const [collapesed, setCollapsed] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // nav with active
  const navigate = useNavigate();

  // MUI
  // const [anchorEl1, setAnchorEl1] = React.useState(null);
  // const open = Boolean(anchorEl1);

  // const handleClick = (event) => {
  //   setAnchorEl1(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl1(null);
  // };

  // Navbar
  useEffect(() => {

    function updateSize() {
      if (window.innerWidth > 960) {
        setCollapsed(false);
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const toggleClasses = [
    Styles.linksWrapperMobile,
    collapesed ? Styles.activeNav : "",
  ].join(" ");
  const bar1 = [Styles.line1, collapesed ? Styles.a : ""].join(" ");
  const bar2 = [Styles.line2, collapesed ? Styles.a : ""].join(" ");
  const bar3 = [Styles.line3, collapesed ? Styles.a : ""].join(" ");

  // Go to Login Page
  const goToLoginPage = () => {
    navigate("/login");
  };

  // Go to Sign Up Page
  const goToSignUpPage = () => {
    navigate("/SignUp");
  };

  // Go to cart page
  const goToCardPage = () => {
    navigate("/cart");
  };

  return (
    <section className={Styles.heroSection}>
      <header className={Styles.header}>
        <nav className={Styles.navBar}>
          <NavLink
            to="/"
            // onClick={() => handleLinkClick(0, "/home")}
            className={Styles.logoContainer}
            aria-label="Go to homepage"
          >
            <img src={logo} height={60} alt="Lalezar Logo" />
          </NavLink>

          <ul className={Styles.linksWrapperContainer}>
            {/* Navbar beginning */}
            <ul className={Styles.linksWrapper}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ProductsPage"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Blogs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ContactUs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  ContactUs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AboutUs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  AboutUs
                </NavLink>
              </li>
              <div className={Styles.languageSwitcher}>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
                {/* <p>
                  You selected:{" "}
                  {selectedLanguage === "en" ? "English" : "العربية"}
                </p> */}
              </div>
            </ul>
            {/* Navbar Ending */}

            {/* SignUp LogIn beginning */}
            <ul className={Styles.linksWrapper}>
              <li>
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={goToLoginPage}
                    variant="outlined"
                    sx={{
                      color: "#C86823",
                      borderColor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#C86823",
                        backgroundColor: "#C86823",
                        color: "white",
                      },
                    }}
                  >
                    LogIn
                  </Button>

                  <Button
                    onClick={goToSignUpPage}
                    variant="contained"
                    sx={{
                      bgcolor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#A0471D",
                        color: "white",
                      },
                    }}
                  >
                    SignUp
                  </Button>
                </Stack>
              </li>
            </ul>
            {/* SignUp LogIn ending */}
            <ul style={{ margin: "auto" }}>
              <li style={{ listStyle: "none" }}>
                {/* Badge beginning */}

                <IconButton
                  aria-label="cart"
                  onClick={goToCardPage}
                  sx={{
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  <Badge
                    badgeContent={4}
                    color="secondary"
                    sx={{
                      color: "black",
                      "& .MuiBadge-badge": { bgcolor: "#C86823" },
                      "& .MuiBadge-badge:hover": {
                        bgcolor: "#A0471D",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {/* Badge ending */}
              </li>
            </ul>
          </ul>

          {/* ///////////////
          /////////////////
          /////////////////
          /////////////////
          ////////////////

          this for burger 
          
          /////////////////
          ////////////////
          ////////////////
          ////////////////
          ////////////*/}

          <ul className={toggleClasses}>
            <li>
              <NavLink
                to="/"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ProductsPage"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Blogs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ContactUs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/AboutUs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                About Us
              </NavLink>
            </li>

            <li>
              <div className={Styles.languageSwitcher}>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
                <p>
                  You selected:{" "}
                  {selectedLanguage === "en" ? "English" : "العربية"}
                </p>
              </div>
            </li>

            <li>
              <Stack
                direction="row"
                sx={{
                  flexDirection: "column",
                  rowGap: "30px",
                  margin: "0 20px",
                }}
              >
                <Button
                  onClick={goToLoginPage}
                  variant="outlined"
                  sx={{
                    color: "#C86823",
                    borderColor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    // width:"100px",
                    "&:hover": {
                      borderColor: "#C86823",
                      backgroundColor: "#C86823",
                      color: "white",
                    },
                  }}
                >
                  LogIn
                </Button>

                <Button
                  onClick={goToSignUpPage}
                  variant="contained"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    // width:"100px",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  SignUp
                </Button>
              </Stack>
            </li>
          </ul>

          <div
            className={Styles.burgerButton}
            onClick={() => setCollapsed(!collapesed)}
          >
            <div className={bar1}></div>
            <div className={bar2}></div>
            <div className={bar3}></div>
          </div>
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
