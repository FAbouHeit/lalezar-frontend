import React from 'react'
import styles from "./CardItem.module.css"
import image from "../../Assets/product.png"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CardItem({ title, color, image, mainPrice }) {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  const totalPrice = parseFloat((count * mainPrice).toFixed(2));


  return (
    <>
      <section className={styles.section}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            <div className={styles.color} style={{
              backgroundColor: color
            }}></div>
            <img className={styles.img} src={image}/>

          </div>
          <p className={styles.title}>
            {title}
          </p>
          <p className={styles.price}>
            {mainPrice}$
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.countContainer}>
            <span onClick={handleDecrement}><RemoveIcon /></span>
            <input className={`${styles.input}`} type='number' min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} />
            <span onClick={handleIncrement}><AddIcon /></span>
          </div>
          <p className={styles.price}>
            {totalPrice}$
          </p>
          <IconButton sx={{
            ":hover .MuiSvgIcon-root": {
              color: 'red',
            },
            ":hover .MuiIconButton-root": {
              bgcolor: 'transparent'
            }
          }}>
            <DeleteOutlineIcon sx={{
              color: '#C86823',

            }} />
          </IconButton>
        </div>
      </section>
    </>
  )
}
