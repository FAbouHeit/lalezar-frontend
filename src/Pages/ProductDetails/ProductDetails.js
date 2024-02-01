import React, { useEffect, useState } from "react";
import StyleSingleProduct from "./ProductDetails.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Reveal } from "../../RevealAnimation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading.js";

function ProductDetails() {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  function handleIncrease() {
    setCount((prev) => prev + 1);
  }
  function handleDecrease() {
    setCount((prev) => prev - 1);
  }
  async function getProduct() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}products/product/${slug}`
      );
      if (response) {
        // console.log(response.data);
        setProduct(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getProduct();
  }, [slug]);

  const addToCart = (product) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = currentItems.findIndex(
      (item) => item.id === product._id
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += count;
    } else {
      currentItems.push({
        id: product._id,
        name: product.name,
        price : product.price,
        quantity: count,
      });
    }

    showToast(`${product.name} added successfuly to your bag 😍`);

    localStorage.setItem("cart", JSON.stringify(currentItems));
  };

  const showToast = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#c86823",
        color: "#fff",
        fontSize: "16px",
      },
    });
  };

  return isLoading ? (
    <h1
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading/>
    </h1>
  ) : (
    <>
      <Helmet>
        <title>Lalezar Spices - Premium {product.name}</title>
        <meta
          name="description"
          content={`Explore the exquisite flavors of our ${product.name}. Handcrafted with care and expertise, this premium spice is sure to elevate your culinary experience.`}
        />
        <meta
          name="keywords"
          content={`Lalezar Spices, spices, spice collection, gourmet spices, cooking, culinary, seasoning, premium spices, international spices, organic spices, handmade spices, exotic spices, spice blends, herbs, chili peppers, saffron, cumin, cardamom, paprika, curry powder, culinary herbs, artisanal spices, spice shop, online spice store, ${product.name}`}
        />
      </Helmet>

      <Reveal>
        <div className={StyleSingleProduct.container}>
          <article className={StyleSingleProduct.imageArticle}>
            <img
              src={`${process.env.REACT_APP_IMAGE_PATH}${product.image}`}
              alt="lalezar"
              className={StyleSingleProduct.imageProduct}
            />
          </article>

          <article className={StyleSingleProduct.contentArticle}>
            <div className={StyleSingleProduct.nameContainer}>
              <h1>{product.name}</h1>
              <p>$1.85</p>
            </div>
            <div className={StyleSingleProduct.categoryContainer}>
              <span>Category :</span>
              <p>{product.category.name}</p>
            </div>
            <div className={StyleSingleProduct.weightContainer}>
              <span>Weight : </span>
              <p>{product.weight} Gr.</p>
            </div>
            <div className={StyleSingleProduct.colorContainer}>
              <span>Color : </span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: `${product.color.hex}`,
                  borderRadius: "100%",
                }}
              ></div>
            </div>
            <section className={StyleSingleProduct.quantityContainer}>
              <span>Quantity : </span>
              <section className={StyleSingleProduct.quantityControl}>
                <div
                  className={`${StyleSingleProduct.decrease} ${
                    count === 0 ? StyleSingleProduct.disabled : ""
                  }`}
                  onClick={count > 0 ? handleDecrease : null}
                >
                  -
                </div>
                <div className={StyleSingleProduct.currentQuantity}>
                  {count}
                </div>
                <div
                  className={StyleSingleProduct.increase}
                  onClick={handleIncrease}
                >
                  +
                </div>
              </section>
            </section>
            <div className={StyleSingleProduct.descriptionContainer}>
              <span>Description: </span>
              <p>{product.description}</p>
            </div>
            <div className={StyleSingleProduct.ingredientsContainer}>
              <span>Ingredients:</span>
              <p style={{ width: "70%" }}>{product.ingredients}</p>
            </div>
            {product.stock === true ? (
              <div className={StyleSingleProduct.ingredientsContainer}>
                <span>Stock : </span>
                <p>Available</p>
              </div>
            ) : (
              ""
            )}
            <button
              className={StyleSingleProduct.addToCart}
              onClick={() => addToCart(product)}
            >
              {<AddShoppingCartIcon />}Add to Cart
            </button>
          </article>
        </div>
      </Reveal>
      <ToastContainer />
    </>
  );
}

export default ProductDetails;