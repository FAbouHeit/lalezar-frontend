import React, { useContext } from "react";
import HeroSection from "../../Components/Hero/HeroSection";
import MainCategories from "../../Components/MainCategories/MainCategories";
import Styles from "./Home.module.css";
import ChooseUs from "../../Components/ChooseUs/ChooseUs";
import BlogCard from "../../Components/BlogCard2/BlogCard";
import Clients from "../../Components/Clients/Clients";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import { Reveal } from "../../RevealAnimation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { CartContext } from "../../Context/CartContext";

const Home = () => {
  const { increaseCartItem, setCartItems } = useContext(CartContext);

  const {
    isPending: isProductsPending,
    error: isProductsError,
    data: productsData,
  } = useQuery({
    queryKey: ["Last4Products"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}products/last4`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  const {
    isPending: isBlogPending,
    isError: isBlogError,
    data: blogData,
  } = useQuery({
    queryKey: ["blogData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}blog`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }
    },
  });

  const {
    isPending: isCategoryPending,
    isError: isCategoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}categories`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }
    },
  });

  const {
    isPending: isClientPending,
    isError: isClientError,
    data: clientData,
  } = useQuery({
    queryKey: ["clientData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}client`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
      }
    },
  });

  const showToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#fff",
        color: "#c86823",
        fontSize: "16px",
      },
    });
  };

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

  return (
    <div
      style={{
        width: "100%",
        margin: "5rem auto",
      }}
    >
      <ToastContainer />
      <HeroSection />
      <main className={Styles.main}>
        <h2 className={Styles.h2}>Main Categories</h2>
        <MainCategories
          categoryData={categoryData}
          isPending={isCategoryPending}
          isError={isCategoryError}
        />
        <h2 className={Styles.h2}>Latest Products</h2>
        <article className={Styles.products}>
          {isProductsPending ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "700",
                }}
              >
                Loading ...
              </p>
            </div>
          ) : isProductsError ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "red",
                  fontWeight: "700",
                }}
              >
                An Error Occured
              </p>
            </div>
          ) : (
            productsData.map((product, index) => (
              <Reveal key={index}>
                <div className={Styles.oneCart}>
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
                      className={Styles.imgCart}
                      alt={product.slug}
                    />
                    <div>
                      <section className={Styles.infoCart}>
                        <strong style={{ fontSize: "25px" }}>
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
            ))
          )}
        </article>
        <article className={Styles.chooseUsContainer}>
          <div className={Styles.chooseUsWraper}>
            <section className={Styles.chooseUsLeft}>
              What you will get from one click with us
            </section>
            <section className={Styles.chooseUsRight}>
              <ChooseUs />
            </section>
          </div>
        </article>

        <h2 className={Styles.h2}>Latest Blogs</h2>
        <article className={Styles.Blogs}>
          {isBlogPending ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "700",
                }}
              >
                Loading
              </p>
            </div>
          ) : isBlogError ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "red",
                  fontWeight: "700",
                }}
              >
                An Error Occured
              </p>
            </div>
          ) : (
            blogData.map((item, index) => {
              return (
                <BlogCard
                  key={index}
                  title={item.title_en}
                  image={item.images[0]}
                  description={item.description_en}
                  slug={item.slug}
                />
              );
            })
          )}
        </article>
        <article>
          <h2 className={Styles.h2}>Our Clients </h2>
          <Clients
            data={clientData}
            isPending={isClientPending}
            isError={isClientError}
          />
        </article>
      </main>
    </div>
  );
};

export default Home;
