import React, { useEffect, useState } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

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
          `${
            process.env.REACT_APP_BACKEND_ENDPOINT
          }products?pageNumber=${currentPage}&pageSize=${12}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  const handleSearchInputChange = (event, newValue) => {
    if (typeof newValue === "object" && newValue !== null) {
      setSearchInput(newValue.name || "");
    } else {
      setSearchInput(newValue || "");
    }
  };

  const updateSideBar = () => {
    if (window.innerWidth > 959) {
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
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (categoriesError || productsError) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>An error occured while fetching Data</h1>
      </div>
    );
  }

  const openNav = () => {
    setSidePanelWidth(400);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  // For showing products based on search or categories
  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [categoryId]: isChecked,
    }));

    setSelectedCategories((prevSelected) =>
      isChecked
        ? [...prevSelected, categoryId]
        : prevSelected.filter((id) => id !== categoryId)
    );
  };

  const filteredProducts = productsData
    .filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (categoryId) => categoryId === product.category
        );

      return matchesCategory;
    });

  return (
    <>
      <Helmet>
        <title>Lalezar Spices - Exquisite Spice Collection</title>
        <meta
          name="description"
          content="Discover the artistry of handcrafted spices at Lalezar Spices. Elevate your culinary creations with our premium spices made with care and expertise."
        />
        <meta
          name="keywords"
          content="Lalezar Spices, spices, spice collection, gourmet spices, cooking, culinary, seasoning, premium spices, international spices, organic spices, handmade spices, exotic spices, spice blends, herbs, chili peppers, saffron, cumin, cardamom, paprika, curry powder, culinary herbs, artisanal spices, spice shop, online spice store"
        />
      </Helmet>
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
                    options={productsData.map((product) => ({
                      name: product.name,
                    }))}
                    getOptionLabel={(option) => option.name}
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
                    onChange={handleSearchInputChange}
                  />
                </Stack>
              </article>
            </section>

            <section className={StyleProducts.categoryArticle}>
              <article>
                <h3>Categories</h3>
                <div className={StyleProducts.checkBoxContainer}>
                  {categoriesData.map((category) => (
                    <div
                      key={category._id}
                      className={StyleProducts.checkBoxLine}
                    >
                      <input
                        type="checkbox"
                        id={category.name}
                        name={category.name}
                        value={category.name}
                        data-id={category.id}
                        className={StyleProducts.customCheckbox}
                        onChange={(e) => handleCheckboxChange(e, category._id)}
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
            {filteredProducts.map((product) => (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/ProductDetails/${product.slug}`}
                key={product._id}
                className={StyleProducts.oneCart}
                // state={{ id: product._id }}
              >
                <img
                  src={`${process.env.REACT_APP_IMAGE_PATH}${product.image}`}
                  className={StyleProducts.imgCart}
                />
                <div>
                  <section className={StyleProducts.infoCart}>
                    <strong style={{ fontSize: "25px" }}>{product.name}</strong>
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
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(productsData.length)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                variant="outlined"
                sx={{
                  "& .MuiPaginationItem-root:hover": {
                    bgcolor: "#c86823",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    bgcolor: "#c86823",
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
