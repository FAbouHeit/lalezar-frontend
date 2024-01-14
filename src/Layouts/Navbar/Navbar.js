import React from "react";
import Styles from "./Navbar.module.css";
import logo from "../../Assets/logo.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Layouts/Buttons/Button.js";

function Navbar() {
  const [collapesed, setCollapsed] = useState(false);

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

  return (
    <section className={Styles.heroSection}>
      <header className={Styles.header}>
        <nav className={Styles.navBar}>
          <a
            className={Styles.logoContainer}
            href="/"
            aria-label="Go to homepage"
          >
            <img src={logo} width={200} height={31.5} alt="Lalezar Logo" />
          </a>
          <ul className={Styles.linksWrapper}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ProductsPage">Products</Link>
            </li>
            <li>
              <Link to="/Blogs">Blogs</Link>
            </li>
            <li>
              <Button />
            </li>
          </ul>

          <ul className={toggleClasses}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ProductsPage">Products</Link>
            </li>
            <li>
              <Link to="/Blogs">Blogs</Link>
            </li>
            <li>
              <Button />
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

// import React from 'react'

// function Navbar() {
//   return (
//     <div>
//       <h1>navbar</h1>
//     </div>
//   )
// }

// export default Navbar
