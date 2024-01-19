import React, { useEffect, useState } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Products = () => {
  const [sidePanelWidth, setSidePanelWidth] = useState(400);

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const openNav = () => {
    setSidePanelWidth(400);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  useEffect(() => {
    function updateSideBar() {
      if (window.innerWidth > 960) {
        setSidePanelWidth(400);
      } else {
        setSidePanelWidth(0);
      }
    }

    window.addEventListener("resize", updateSideBar);
    updateSideBar();

    return () => {
      window.removeEventListener("resize", updateSideBar);
    };
  }, []);

  return (
    <div style={{ display: "flex" }} className={StyleProducts.big}>
      <div
        id="mySidepanel"
        className={StyleProducts.sidepanel}
        style={{
          width: sidePanelWidth + "px",
          height: "100%",
          borderRight: "1px solid rgb(110, 110, 110)",
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
              <Stack  className={StyleProducts.stack}>
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
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                    className={StyleProducts.customCheckbox}
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                    className={StyleProducts.customCheckbox}
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                    className={StyleProducts.customCheckbox}
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
                <div className={StyleProducts.checkBoxLine}>
                  <input
                    type="checkbox"
                    id="Eastern&Western"
                    name="Eastern&Western"
                    value="Eastern&Western"
                    className={StyleProducts.customCheckbox}
                  />
                  <label htmlFor="Eastern&Western"> Eastern & Western</label>
                </div>
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
        <h2>Collapsed Sidepanel</h2>
        <p>Content...</p>
      </div>
    </div>
  );
};

export default Products;
