import React from "react";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Styles from "./Navbar.module.css";
import logo from "../../Assets/logo.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Navbar() {
  const [collapesed, setCollapsed] = useState(false);

  // nav with active
  const [isActive, setActive] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  const handleLinkClick = (index, path) => {
    setActive([false, false, false, false, false]);
    setActive((prev) => {
      const newActive = [...prev];
      newActive[index] = true;
      return newActive;
    });
    localStorage.setItem("activeLink", path);
    navigate(path);

    setCollapsed(false);
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    const activeIndex = [
      "/home",
      "/ProductsPage",
      "/BlogsPage",
      "/ContactUs",
      "/AboutUs",
    ].indexOf(storedActiveLink);
    setActive([false, false, false, false]);
    if (activeIndex !== -1) {
      setActive((prev) => {
        const newActive = [...prev];
        newActive[activeIndex] = true;
        return newActive;
      });
    }
  }, [navigate]);

  // MUI
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleClickMobile = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setAnchorEl2(null);
  };

  // Navbar
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 600) {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
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

  return (
    <section className={Styles.heroSection}>
      <header className={Styles.header}>
        <nav className={Styles.navBar}>
          <NavLink
            to="/home"
            onClick={() => handleLinkClick(0, "/home")}
            className={Styles.logoContainer}
            aria-label="Go to homepage"
          >
            <img src={logo} height={60} alt="Lalezar Logo" />
          </NavLink>

          <ul className={Styles.linksWrapperContainer}>
            <ul className={Styles.linksWrapper}>
              <li>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    color: "black",
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      opacity: "1",
                      transition: "0.5s ease",
                      color: "#C86823",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Categories
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl1}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    mt: "3rem",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#C86823",
                      },
                    }}
                  >
                    Eastern & Western
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#C86823",
                      },
                    }}
                  >
                    Artal Al Ajdad
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#C86823",
                      },
                    }}
                  >
                    AL Baset
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#C86823",
                      },
                    }}
                  >
                    Local Products
                  </MenuItem>
                </Menu>
              </li>
            </ul>
            {/* Categoriy Drop Down ending */}
          </ul>

          <ul className={Styles.linksWrapperContainer} style={{columnGap:"5vw"}}>
            {/* Categoriy Drop Down beginning */}

            {/* Navbar beginning */}
            <ul className={Styles.linksWrapper}>
              <li>
                <NavLink
                  to="/home"
                  onClick={() => handleLinkClick(0, "/home")}
                  className={isActive[0] ? Styles.activeLink : ""}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ProductsPage"
                  onClick={() => handleLinkClick(1, "/ProductsPage")}
                  className={isActive[1] ? Styles.activeLink : ""}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/BlogsPage"
                  onClick={() => handleLinkClick(2, "/BlogsPage")}
                  className={isActive[2] ? Styles.activeLink : ""}
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ContactUs"
                  onClick={() => handleLinkClick(3, "/ContactUs")}
                  className={isActive[3] ? Styles.activeLink : ""}
                >
                  ContactUs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/AboutUs"
                  onClick={() => handleLinkClick(4, "/AboutUs")}
                  className={isActive[4] ? Styles.activeLink : ""}
                >
                  AboutUs
                </NavLink>
              </li>
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
                      textTransform:"none",
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
                      textTransform:"none",
                      "&:hover": {
                        bgcolor: "white",
                        color: "#C86823",
                      },
                    }}
                  >
                    SignUp
                  </Button>
                </Stack>
              </li>
            </ul>
            {/* SignUp LogIn ending */}
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
                to="/home"
                onClick={() => handleLinkClick(0, "/home")}
                className={isActive[0] ? Styles.activeLink : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ProductsPage"
                onClick={() => handleLinkClick(1, "/ProductsPage")}
                className={isActive[1] ? Styles.activeLink : ""}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/BlogsPage"
                onClick={() => handleLinkClick(2, "/BlogsPage")}
                className={isActive[2] ? Styles.activeLink : ""}
              >
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ContactUs"
                onClick={() => handleLinkClick(3, "/ContactUs")}
                className={isActive[3] ? Styles.activeLink : ""}
              >
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/AboutUs"
                onClick={() => handleLinkClick(4, "/AboutUs")}
                className={isActive[4] ? Styles.activeLink : ""}
              >
                About Us
              </NavLink>
            </li>

            <li>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open2 ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  endIcon={<ExpandMoreIcon />}
                  onClick={handleClickMobile}
                  sx={{
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      opacity: "1",
                      transition: "0.5s ease",
                      color: "#C86823",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Categories
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleCloseMobile}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      color: "white",
                      backgroundColor: "black",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Eastern & Western
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Artal Al Ajdad
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    AL Baset
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Local Products
                  </MenuItem>
                </Menu>
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
                      bgcolor: "white",
                      color: "#C86823",
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
