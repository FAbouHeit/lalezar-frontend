import React from "react";
import HeroSection from "../../Components/Hero/HeroSection";
import MainCategories from "../../Components/MainCategories/MainCategories";
import Styles from "./Home.module.css";
import ChooseUs from "../../Components/ChooseUs/ChooseUs";
import img from "../../Assets/category2.jpg";
import BlogCard from "../../Components/BlogCard2/BlogCard";

const Home = () => {
  const data = [
    {
      title: "24 x 7 User Support",
      image: img,
      description:
        "We use latest technology ",
    },
    {
      title: "24 x 7 User Support",
      image: img,
      description:
        "We use latest technology ",
    },
  ];
  return (
    <div
      style={{
        width: "90%",
        margin: "5rem auto",
      }}
    >
      <HeroSection />
      <main className={Styles.Category}>
        <h2 className={Styles.h2}>Main Categories</h2>
        <MainCategories />

        <h2 className={Styles.h2}>Our Services</h2>
        <ChooseUs />

        <h2 className={Styles.h2}>Latest Blogs</h2>
        <article className={Styles.Blogs}>
          {data.map((item, index) => {
            return (
              <BlogCard
                key={index}
                title={item.title}
                image={item.image}
                description={item.description}
              />
            );
          })}
        </article>
      </main>
    </div>
  );
};

export default Home;
