import React from "react";
import HeroSection from "../../Components/Hero/HeroSection";
import MainCategories from "../../Components/MainCategories/MainCategories";
import Styles from './Home.module.css'

function Home() {
  return (
    <div style={{
      width: '90%',
      margin: 'auto'
    }}>
      <HeroSection />
      <main className={Styles.Category}>
        <h2 className={Styles.h2}>Main Categories</h2>
        <MainCategories />

        <h2 className={Styles.h2}>Why Choose us</h2>

      </main>
    </div>
  );
}

export default Home;
