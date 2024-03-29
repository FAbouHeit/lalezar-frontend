import React, { useContext, useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { Reveal } from "../../RevealAnimation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationItem from "@mui/material/PaginationItem";
// import Loading from '../../Assets/loadinggg-ezgif.com-video-to-webp-converter.webp'
// import louaiLoading from '../../Assets/louaiiloading.webp'
import Loading from "../Loading/Loading.js";
import { Button } from "@mui/material";
import { CartContext } from "../../Context/CartContext";

const Products = () => {
  const { increaseCartItem, setCartItems } = useContext(CartContext);
  const { categoryId } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    categoryId ? [`${categoryId}`] : []
  );
  const [checkboxes, setCheckboxes] = useState({});
  const productsPerPage = 12;

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
          `${process.env.REACT_APP_BACKEND_ENDPOINT}products`
        );
        // console.log(response.data);
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
        {/* <img src={Loading}/>
        <img src={louaiLoading}/> */}
        <Loading />
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
        {/* <h1>An error occured while fetching Data</h1> */}
        <Loading />
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
          (categoryId) => categoryId === product.category._id
        );

      return matchesCategory;
    });

  // Calculate the start and end index of products to display on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Add To Cart Section
  const addToCart = (product) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentItems.find((item) => item.id === product._id);

    if (!existingItem) {
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        image: `${process.env.REACT_APP_IMAGE_PATH}${product.image}`,
        totalPrice: product.price,
      };

      currentItems.push(newItem);
      localStorage.setItem("cart", JSON.stringify(currentItems));
      showToast(`${product.name} added successfully to your bag`);
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
      increaseCartItem();
    } else {
      showToast(`${product.name} already added to your bag 🙂`);
      return;
    }
  };

  const isProductInCart = (productId) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    return currentItems.some((item) => item.id === productId);
  };

  // Toastify Section
  const showToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
            <Reveal>
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
                          className={`${StyleProducts.searchInput}`}
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
            </Reveal>

            <Reveal>
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
                          onChange={(e) =>
                            handleCheckboxChange(e, category._id)
                          }
                        />
                        <label htmlFor={category.name}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </Reveal>
          </div>
        </div>

        {sidePanelWidth === 400 ? (
          <span className={StyleProducts.openbtn} onClick={closeNav}>
            <ArrowBackIosIcon
              style={{
                color: "#c86823",
                borderRight: "1px solid rgb(110, 110, 110)",
              }}
            ></ArrowBackIosIcon>
          </span>
        ) : (
          <button className={StyleProducts.openbtn} onClick={openNav}>
            <ArrowForwardIosIcon
              style={{ color: "#c86823" }}
            ></ArrowForwardIosIcon>
          </button>
        )}

        <div className={StyleProducts.content}>
          <div className={StyleProducts.cartContainer}>
            {paginatedProducts.map((product) => (
              <Reveal key={product._id}>
                <div className={StyleProducts.oneCart}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background-color 0.5s, opacity 0.3s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    to={`/ProductDetails/${product.slug}`}
                    key={product._id}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f8f8";
                      e.currentTarget.style.opacity = 0.8;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.opacity = 0.8;
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_IMAGE_PATH}${product.image}`}
                      className={StyleProducts.imgCart}
                      alt={product.name}
                    />
                    <div>
                      <section className={StyleProducts.infoCart}>
                        <strong
                          style={{
                            fontSize: "20px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.name}
                        </strong>
                        {product.category.name}
                        <p style={{ fontSize: "20px" }}>${product.price}</p>
                      </section>
                    </div>
                  </Link>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isProductInCart(product._id)}
                    onClick={() => addToCart(product)}
                    sx={{
                      bgcolor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      "&:hover": {
                        bgcolor: "#A0471D",
                        color: "white",
                      },
                      textTransform: "none",
                      fontSize: "1.1rem",
                    }}
                  >
                    {isProductInCart(product._id) ? (
                      "Already in Cart"
                    ) : (
                      <>
                        <AddShoppingCartIcon />
                        Add to cart
                      </>
                    )}{" "}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
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
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    disabled={
                      !paginatedProducts.length && item.page === currentPage
                    }
                  />
                )}
              />
            </Stack>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
