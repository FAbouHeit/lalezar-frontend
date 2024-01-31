import React from "react";
import styles from "./CardItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

export default function CardItem({
  id,
  setTotalPrice,
  name,
  quantity,
  price,
  color,
  image,
  onDelete,
  calculateTotalPrice,
  slug,
}) {
  const [count, setCount] = useState(quantity);
  // const [totalPrice, setTotalPrice] = useState(quantity * price);
  const [editQuantity, setEditQuantity] = useState(quantity);
  const [totalPrice1, setTotalPrice1] = useState(price);
  const handleDelete = () => {
    onDelete(id);
  };

  useEffect(() => {
    setTotalPrice1(count * price);
  }, [count, price]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const currentItem = storedCart.find((item) => item.id === id);
    const storedQuantity = currentItem ? currentItem.quantity : editQuantity;
    setEditQuantity(storedQuantity);
  }, [id, editQuantity]);

  const handleIncrement = () => {
    setEditQuantity((prev) => {
      const newQuantity = prev + 1;
      setCount(newQuantity);
      updateQuantityInLocalStorage(newQuantity);
      const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalPriceAll2 = calculateTotalPrice(currentItems);
      setTotalPrice(totalPriceAll2);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (count > 1) {
      setEditQuantity((prev) => {
        const newQuantity = prev - 1;
        setCount(newQuantity);
        updateQuantityInLocalStorage(newQuantity);
        const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
        const totalPriceAll2 = calculateTotalPrice(currentItems);
        setTotalPrice(totalPriceAll2);
        return newQuantity;
      });
    } else {
      setCount(1);
    }
  };

  const updateQuantityInLocalStorage = (newQuantity) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity: newQuantity };
        updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (e) => {
    const newCount = Number(e.target.value);
    if (newCount >= 1) {
      setCount(newCount);
      setTotalPrice1(newCount * price);
      updateQuantityInLocalStorage(newCount);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            <div
              className={styles.color}
              style={{
                backgroundColor: color,
              }}
            ></div>
            <Link
              style={{
                textDecoration: "none",
              }}
              to={`/ProductDetails/${slug}`}
            >
              <img className={styles.img} src={image} alt={name}/>
            </Link>
          </div>
          <p className={styles.title}>{name}</p>
          <p className={styles.price}>{price}$</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.countContainer}>
            <IconButton onClick={count > 0 ? handleDecrement : null}>
              <RemoveIcon />{" "}
            </IconButton>
            <input
              className={`${styles.input}`}
              type="number"
              min={1}
              max={100}
              value={count === 0 ? "" : count}
              onChange={handleQuantityChange}
            />
            <IconButton onClick={handleIncrement}>
              <AddIcon />{" "}
            </IconButton>
          </div>
          <p className={styles.price}>${totalPrice1.toFixed(2)}</p>
          <IconButton
            onClick={handleDelete}
            sx={{
              ":hover .MuiSvgIcon-root": {
                color: "red",
              },
              ":hover .MuiIconButton-root": {
                bgcolor: "transparent",
              },
            }}
          >
            <DeleteOutlineIcon
              sx={{
                color: "#C86823",
              }}
            />
          </IconButton>
        </div>
      </section>
    </>
  );
}
