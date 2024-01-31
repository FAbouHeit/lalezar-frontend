import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const cartItemsString = localStorage.getItem("cart");

    // Parse the JSON string to get the array of cart items
    const cartItems = JSON.parse(cartItemsString) || [];

    // Get the length of the cart items array
    const itemCount = cartItems.length;

    // Set the cart item count in state
    setCartItemCount(itemCount);
  }, []);

  const decreaseCartItemCount = () => {
    setCartItemCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const increaseCartItem = () => {
    setCartItemCount((prevCount) => Math.max(0, prevCount + 1));
  };

  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        setCartItemCount,
        decreaseCartItemCount,
        increaseCartItem,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
