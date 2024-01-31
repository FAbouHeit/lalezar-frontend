import React, { useContext } from "react";
import CardItem from "../../Components/CardItem/CardItem.js";
import CardCheckout from "../../Components/CardCheckout/CardCheckout.js";
import Style from "./Cart.module.css";
import { useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext.js";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (items) => {
    let totalPriceAll = 0;
    items.forEach((item) => {
      const totalPriceProduct = parseFloat(item.totalPrice);
      if (!isNaN(totalPriceProduct)) {
        totalPriceAll += totalPriceProduct;
      }
    });
    return totalPriceAll;
  };

  const { decreaseCartItemCount } = useContext(CartContext);

  useEffect(() => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(currentItems);

    const totalPriceAll2 = calculateTotalPrice(currentItems);
    setTotalPrice(totalPriceAll2);
  }, [cartItems]);

  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    toast.success(`Item removed from your cart`);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    const totalPriceAll2 = calculateTotalPrice(updatedItems);
    setTotalPrice(totalPriceAll2);
    decreaseCartItemCount();
    setCartItems(cartItems - 1);
  };

  return (
    <div className={Style.main}>
      <ToastContainer />
      <div className={Style.pageWrapper}>
        <div className={Style.cardContainer}>
          {cartItems &&
            cartItems.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                slug={item.slug}
                // color={item.color}
                image={item.image}
                price={item.price}
                onDelete={() => handleDeleteItem(item.id)}
                totalPrice={totalPrice}
                cartItems={cartItems}
                setTotalPrice={setTotalPrice}
                calculateTotalPrice={calculateTotalPrice}
              />
            ))}
        </div>
        <div className={Style.checkoutContainer}>
          <CardCheckout
            setCartItems={setCartItems}
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}
