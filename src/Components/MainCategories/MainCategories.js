import React from "react";
import Styles from "./MainCategories.module.css";
import image1 from "../../Assets/category1.jpg";
import image2 from "../../Assets/category2.jpg";
import { Button } from "@mui/material";

const MainCategories = () => {
  const data = [
    { title: "Most tastier spices ever", img: image1 },
    { title: "100% Organic Products", img: image2 },
  ];
  return (
    <article className={Styles.container}>
      {data.map((item, index) => {
        const divClassName =
          index === 1 ? Styles.insideRight : Styles.insideLeft;
        const imgClass = index === 1 ? Styles.imgRight : Styles.imgLeft;
        return (
          <section className={Styles.main}>
            <img src={item.img} alt="img" className={imgClass} />
            <div className={divClassName}>
              <p className={Styles.P}>{item.title}</p>
              <div className={Styles.btn}>
                <Button
                  sx={{
                    fontSize: '0.8rem',
                    bgcolor: "#C86823",
                    color: "white",
                    ":hover": {
                      bgcolor: "#A0471D",
                    },
                  }}
                >
                  View more
                </Button>
              </div>
            </div>
          </section>
        );
      })}
    </article>
  );
};

export default MainCategories;
