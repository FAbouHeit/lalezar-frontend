import React from 'react'
import CardItem from "../../Components/CardItem/CardItem.js"
import CardCheckout from "../../Components/CardCheckout/CardCheckout.js"
import Style from "./Cart.module.css"

export default function Cart() {
  return (
    <div className={Style.main}>
    <div className={Style.pageWrapper}>
      <div className={Style.cardContainer}>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     <CardItem/>
     </div>
     <div className={Style.checkoutContainer}>
     <CardCheckout/>
     </div>
    </div>
    </div>
  )
}
