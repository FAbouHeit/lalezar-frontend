import React from 'react'
import CardItem from "../../Components/CardItem/CardItem.js"
import CardCheckout from "../../Components/CardCheckout/CardCheckout.js"
import Style from "./Cart.module.css"
import productImage from "../../Assets/product.png"

export default function Cart() {

  const cardItemsData = [
    {
      id: 1,
      title: "kerkom",
      color: "yellow",
      image: productImage,
      mainPrice: 19.99,
    },
    {
      id: 1,
      title: "babrekaaaaaaaaaaa",
      color: "green",
      image: productImage,
      mainPrice: 19.99,
    },
    {
      id: 1,
      title: "olive  mdkjwqbdhbfjewfewig oil",
      color: "Blue",
      image: productImage,
      mainPrice: 19.99,
    },
    {
      id: 1,
      title: "kezbara",
      color: "red",
      image: productImage,
      mainPrice: 19.99,
    },

  ];

  return (
    <div className={Style.main}>
      <div className={Style.pageWrapper}>
        <div className={Style.cardContainer}>
          {cardItemsData.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              color={item.color}
              image={item.image}
              mainPrice={item.mainPrice}
            />
          ))}
        </div>
        <div className={Style.checkoutContainer}>
          <CardCheckout />
        </div>
      </div>
    </div>
  )
}
