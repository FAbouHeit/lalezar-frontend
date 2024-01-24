import React from "react";
import Styles from "./MainCategories.module.css";
import image1 from "../../Assets/category1.jpg";
import image2 from "../../Assets/category2.jpg";
import { Button } from "@mui/material";
import Spices from "../../Assets/Spices.png";
import Organic from "../../Assets/Organic.png";

const MainCategories = () => {
  const data = [
    { title: "Most tastier spices ever", img: Spices, alt: "Spices" },
    { title: "100% Organic Products", img: Organic, alt: "Organic Product" },
  ];
  return (
    <article className={Styles.container}>
      {data.map((item, index) => {
        return (
          <section
            className={`${Styles.section} ${Styles.spin} ${Styles.circle}`}
            key={index}
          >
            <img src={item.img} alt={item.alt} className={Styles.img} />
            <p className={Styles.p}>{item.title}</p>
            <span className={Styles.btn}>
              <Button
                variant="contained"
                sx={{
                  zIndex: 1,
                  bgcolor: "#C86823",
                  ":hover": {
                    bgcolor: "#A0471D",
                  },
                }}
              >
                View More
              </Button>
            </span>
          </section>
        );
      })}
    </article>
  );
};

export default MainCategories;
