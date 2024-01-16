import Styles from "./HeroSection.module.css";
import img from "../../Assets/hero.jpg";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const HeroSection = () => {
  let mystrings;
  useEffect(() => {
    mystrings = [""];
    mystrings.push("Exceptional flavors, perfected seasoning");

    const typed = new Typed(el.current, {
      strings: mystrings,
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mystrings]);
  const el = useRef();

  return (
    <div>
      <header className={Styles.HeroSection}>
        <div className={Styles.left}>
          <p className={Styles.P}>Our Best Of World Class Spices</p>
          <div className={Styles.SloganContainer}>
            <h1 className={Styles.Slogan} ref={el}>Exceptional flavors, perfected seasoning</h1>
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
          >
            Discover products
          </Button>
        </div>
        <div className={Styles.right}>
          <img className={Styles.img} src={img} alt="Lalezar Logo"/>
        </div>
      </header>
    </div>
  );
};

export default HeroSection;
