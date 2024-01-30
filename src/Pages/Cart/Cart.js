import React from 'react'
import CardItem from "../../Components/CardItem/CardItem.js"
import CardCheckout from "../../Components/CardCheckout/CardCheckout.js"
import Style from "./Cart.module.css"
import { useState,useEffect } from 'react'

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);



  const calculateTotalPrice = (items) => {
    let totalPriceAll = 0;
    items.forEach(item => {
      const totalPriceProduct = parseFloat(item.totalPrice);
      if (!isNaN(totalPriceProduct)){
        totalPriceAll += totalPriceProduct; 
      }
    });
    return totalPriceAll;
  };

  useEffect(() => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(currentItems);

    const totalPriceAll2 = calculateTotalPrice(currentItems);
    setTotalPrice(totalPriceAll2);
  }, []);




  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    const totalPriceAll2 = calculateTotalPrice(updatedItems);
    setTotalPrice(totalPriceAll2);
  }
  return (
    <div className={Style.main}>
      <div className={Style.pageWrapper}>
        <div className={Style.cardContainer}>
          {cartItems.map((item) => (
            <CardItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              // color={item.color}
              image={item.image}
              price={item.price}
              onDelete={() => handleDeleteItem(item.id)}
              totalPrice={totalPrice}
              cartItems = {cartItems}
              setTotalPrice={setTotalPrice}
              calculateTotalPrice={calculateTotalPrice}
            />
          ))}
        </div>
        <div className={Style.checkoutContainer}>
          <CardCheckout totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  )
}
