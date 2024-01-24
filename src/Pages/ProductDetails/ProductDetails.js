import React, { useEffect, useState } from "react";
import StyleSingleProduct from "./ProductDetails.module.css";
import Image from "../../Assets/lalezar.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }
  function handleDecrease() {
    setQuantity((prev) => prev - 1);
  }
  async function getProduct() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}products/product/${slug}`
      );
      if (response) {
        console.log(response);
        setProduct(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getProduct();
  }, [slug]);
  
  
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



  return (
    !loading && (
      <>
        <Helmet>
          <title>Lalezar Spices - Premium [Product Name]</title>
          <meta
            name="description"
            content="Explore the exquisite flavors of our [Product Name]. Handcrafted with care and expertise, this premium spice is sure to elevate your culinary experience."
          />
          <meta
            name="keywords"
            content="Lalezar Spices, spices, spice collection, gourmet spices, cooking, culinary, seasoning, premium spices, international spices, organic spices, handmade spices, exotic spices, spice blends, herbs, chili peppers, saffron, cumin, cardamom, paprika, curry powder, culinary herbs, artisanal spices, spice shop, online spice store, [Product Name], [Product Keywords]"
          />
        </Helmet>

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
              <span>Category : </span>
              <p>
                {
                  categoriesData.find(
                    (category) => category._id === product.category
                  )?.name
                }
              </p>
            </div>
            <div className={StyleSingleProduct.colorContainer}>
              <span>Color : </span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "yellow",
                  borderRadius: "100%",
                }}
              ></div>
            </div>
            <section className={StyleSingleProduct.quantityContainer}>
              <span>Quantity : </span>
              <section className={StyleSingleProduct.quantityControl}>
                <div
                  className={`${StyleSingleProduct.decrease} ${
                    quantity === 0 ? StyleSingleProduct.disabled : ""
                  }`}
                  onClick={quantity > 0 ? handleDecrease : null}
                >
                  -
                </div>
                <div className={StyleSingleProduct.currentQuantity}>
                  {quantity}
                </div>
                <div
                  className={StyleSingleProduct.increase}
                  onClick={handleIncrease}
                >
                  +
                </div>
              </section>
            </section>
            <p>{product.description}</p>
            <button className={StyleSingleProduct.addToCart}>
              {<AddShoppingCartIcon />}Add to Cart
            </button>
          </article>
        </div>
      </>
    )
  );
}

export default ProductDetails;
