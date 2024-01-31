import Styles from "./HeroSection.module.css";
import img from "../../Assets/hero.jpg";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  let mystrings;
  const nav = useNavigate()
  useEffect(() => {
    mystrings = [""];
    mystrings.push("Exceptional flavors, perfected seasoning");

    const typed = new Typed(el.current, {
      strings: mystrings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mystrings]);
  const el = useRef();

  return (
      <header className={Styles.HeroSection}>
        <div className={Styles.left}>
          <p className={Styles.P}>Our Best Of World Class Spices</p>
          <div className={Styles.SloganContainer}>
            <h1 className={Styles.Slogan} ><span ref={el}>Exceptional flavors, perfected seasoning</span></h1>
          </div>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#C86823",
              color: "white",
              ":hover": {
                bgcolor: "#A0471D",
              },
            }}
            onClick={()=> {
              nav('/ProductsPage')
            }}
          >
            Discover products
          </Button>
        </div>
        <div className={Styles.right}>
          <img className={Styles.img} src={img} alt="Lalezar Logo" loading="lazy"/>
        </div>
      </header>
  );
};

export default HeroSection;
