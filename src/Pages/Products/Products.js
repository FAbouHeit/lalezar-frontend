import React, { useEffect, useState } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import productImage from "../../Assets/category1.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidePanelWidth, setSidePanelWidth] = useState(400);
  const {
    isPending: isCategoriesPending,
    error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}categories`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
  });

  const {
    isPending: isProductsPending,
    error: productsError,
    data: productsData,
  } = useQuery({
    queryKey: ["productsData", currentPage],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}products?pageNumber=${currentPage}&pageSize=${12}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  const updateSideBar = () => {
    if (window.innerWidth > 960) {
      setSidePanelWidth(400);
    } else if (window.innerWidth < 750) {
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

  if (isCategoriesPending || isProductsPending) {
    return "Loading ...";
  }

  if (categoriesError || productsError) {
    return "An error occured while fetching Data";
  }

  // console.log("Categories data:", categoriesData);
  // console.log("Products data:", productsData);

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
    <div className={StyleProducts.big}>
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
              <Stack
                className={StyleProducts.stack}
                sx={{ padding: "10px 0px" }}
              >
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
                {categoriesData.map((category) => (
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
        <a href="#" className={StyleProducts.openbtn} onClick={closeNav}>
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
        <div className={StyleProducts.cartContainer}>
          {productsData.map((product) => (
            <div key={product.id} className={StyleProducts.oneCart}>
              <img src={`${process.env.REACT_APP_IMAGE_PATH}${product.image}`} className={StyleProducts.imgCart} />
              <div>
                <section className={StyleProducts.infoCart}>
                  <strong style={{ fontSize: "25px" }}>{product.name}</strong>
                  {/* <p style={{ fontSize: "20px" }}>{product.category}</p> */}
                  {
                        categoriesData.find(
                          (category) => category._id === product.category
                        )?.name
                      }
                  <p style={{ fontSize: "20px" }}>${product.price}</p>
                </section>
                <button className={StyleProducts.addToCart}>
                  {<AddShoppingCartIcon />}Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(productsData.length)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Products;
