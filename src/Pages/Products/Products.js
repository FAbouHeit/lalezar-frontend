import React, { useEffect, useState } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import productImage from "../../Assets/category1.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Products = () => {

  
  const [sidePanelWidth, setSidePanelWidth] = useState(400);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}categories`)
        .then((res) => {
          console.log(res.data);
          return res.data;
        }),
  });

  // console.log(data)

  const updateSideBar = () => {
    if (window.innerWidth > 960) {
      setSidePanelWidth(400);
    } else if (window.innerWidth < 431) {
      setSidePanelWidth(400);
    } else {
      setSidePanelWidth(0);
    }
  };

  useEffect(() => {
    updateSideBar();
    window.addEventListener("resize", updateSideBar);
    return () => {
      window.removeEventListener("resize", updateSideBar);
    };
  }, []);

  if (isPending) return "Loading";
  if (error) return "An error has occurred: " + error.message;

  const openNav = () => {
    setSidePanelWidth(400);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  return (
    <div style={{ display: "flex" }} className={StyleProducts.big}>
      <div
        id="mySidepanel"
        className={StyleProducts.sidepanel}
        style={{
          width: sidePanelWidth + "px",
          height: "100%",
        }}
      >
        <div>
          <section className={StyleProducts.sideBarTitle}>
            <Icon></Icon>
            <h1>Categories</h1>
          </section>
          <section className={StyleProducts.searchArticle}>
            <article>
              <h3>Brand</h3>
              <Stack className={StyleProducts.stack}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </Stack>
            </article>
          </section>

          <section className={StyleProducts.categoryArticle}>
            <article>
              <h3>Categories</h3>
              <div className={StyleProducts.checkBoxContainer}>
                {data.map((category) => (
                  <div key={category.id} className={StyleProducts.checkBoxLine}>
                    <input
                      type="checkbox"
                      id={category.name}
                      name={category.name}
                      value={category.name}
                      className={StyleProducts.customCheckbox}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>

      {sidePanelWidth === 400 ? (
        <a
          href="#"
          className={StyleProducts.openbtn}
          style={{ margin: "auto 0" }}
          onClick={closeNav}
        >
          <ArrowBackIosIcon
            style={{
              color: "#c86823",
              borderRight: "1px solid rgb(110, 110, 110)",
            }}
          ></ArrowBackIosIcon>
        </a>
      ) : (
        <button className={StyleProducts.openbtn} onClick={openNav}>
          <ArrowForwardIosIcon
            style={{ color: "#c86823" }}
          ></ArrowForwardIosIcon>
        </button>
      )}

      <div className={StyleProducts.content}>
        <div className={StyleProducts.oneCart}>
          <img src={productImage} className={StyleProducts.imgCart} />
          <div
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <section className={StyleProducts.infoCart}>
              <strong>Kexbra</strong>
              <p>Eastern & Weastern</p>
              <p>$228</p>
            </section>
            <button className={StyleProducts.addToCart}>
              {<AddShoppingCartIcon />}Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
