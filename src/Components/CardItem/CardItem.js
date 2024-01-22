import React from 'react'
import styles from "./CardItem.module.css"
import image from "../../Assets/product.png"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';

export default function CardItem() {
    const [count, setCount] = useState(2);
    const mainPrice = 255; 

    const handleIncrement = () => {
        setCount(count + 1);
      };
    
      const handleDecrement = () => {
        if (count > 1) {
          setCount(count - 1);
        }
      };
      const totalPrice = count * mainPrice;

    return (
        <div className={styles.pageContainer}>
            <section className={styles.cardWrapper}>
                <div className={styles.imageContainer}>
                    <img className={styles.img} src={image} />
                </div>
                <div className={styles.titleContainer}>
                    <div className={styles.name}>
                        kerkom
                    </div>
                    <div className={styles.color}>
                        <div className={styles.colorButton}></div>
                    </div>
                </div>
                <div className={styles.priceContainer}>
                {mainPrice}$
                </div>
                <div className={styles.countContainer}>
          <span onClick={handleDecrement}>-</span>
          <div>{count}</div>
          <span onClick={handleIncrement}>+</span>
        </div>
                <div className={styles.priceTotal}>
                {totalPrice}$
                </div>
                <div className={styles.deleteIcon}><DeleteOutlineIcon /></div>
            </section>
        </div>
    )
}
