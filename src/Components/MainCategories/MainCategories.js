import React from "react";
import Styles from "./MainCategories.module.css";
import image1 from "../../Assets/category1.jpg";
import image2 from "../../Assets/category2.jpg";
import { Button } from "@mui/material";
import Spices from "../../Assets/Spices.png";
import Organic from "../../Assets/Organic.png";
import { useNavigate } from "react-router-dom";

const MainCategories = ({ categoryData }) => {
  const navigate = useNavigate();
  return (
    <article className={Styles.container}>
      {categoryData.map((item, index) => {
        return (
          <section
            to={`/ProductsPage`}
            className={`${Styles.section} ${Styles.spin} ${Styles.circle}`}
            key={index}
          >
            <img src={Spices} alt={item.name} className={Styles.img} />
            <p className={Styles.p}>{item.name}</p>
            <span className={Styles.btn}>
              <Button
                onClick={() => navigate(`/ProductsPage/${item._id}`)}
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
