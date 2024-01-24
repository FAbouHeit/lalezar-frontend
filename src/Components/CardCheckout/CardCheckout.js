import React from 'react'
import styles from './CardCheckout.module.css';
import Button from '@mui/material/Button';

export default function CardCheckout() {
  return (
    <div className={styles.cardPage}>
      <div className={styles.cardWrapper}>
        <p className={styles.titleCard}>Order Summary</p>
        <div className={styles.price}>
          <p>Price</p>
          <span>$99.8</span>
        </div>
        <div className={styles.delevryPart}>
          <p>Delevery fees</p>
          <div>3$</div>
        </div>
        <div className={styles.totalPrice}>
          <p>Total Price</p>
          <div>$110.13</div>
        </div>
        <div className={styles.buttonConainer}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#C86823",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                bgcolor: "#A0471D",
                color: "white",
              },
            }}
          >
            CHECKOUT
          </Button>
        </div>
      </div>

    </div>
  )
}
