import React, { useContext, useState } from "react";
import styles from "./CardCheckout.module.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import useApi from "../../Hooks/UseApi";
import NoteModal from "../Note/Note";
import { ToastContainer, toast } from "react-toastify";

export default function CardCheckout({ setCartItems, totalPrice, cartItems }) {
  const { user } = useContext(AuthContext);
  const { apiCall, error } = useApi();
  const {
    isPending: isDeliveryPending,
    isError: isDeliveryError,
    data: deliveryData,
  } = useQuery({
    queryKey: ["deliveryData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}delivery`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching delivery:", error);
        throw error;
      }
    },
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [address, setAddress] = useState("");
  const [openNote, setOpenNote] = useState(false);

  const handleCountryChange = (event) => {
    const countryValue = event.target.value;
    setSelectedCountry(countryValue);
    setSelectedCity("");
    setSelectedPrice(null);
  };

  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);

    // Find the corresponding delivery option and update the price
    const selectedOption = deliveryData.find(
      (option) =>
        option.country === selectedCountry && option.city === cityValue
    );

    if (selectedOption) {
      setSelectedPrice(selectedOption.price);
    } else {
      setSelectedPrice(null);
    }
  };

  const SendOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      setOpenNote(true);
      return;
    } else {
      try {
        await apiCall({
          method: "post",
          url: "/order",
          data: {
            userId: user.id,
            address: address,
            country: selectedCountry,
            city: selectedCity,
            orderDetails: cartItems,
            deliveryFee: selectedPrice,
          },
        });

        if (error) {
          toast.error("An error occured, order not sent !!");
        } else {
          localStorage.removeItem("cart");
          toast.success("Order sent Successfuly ");
          toast.success("Items removed from your cart ");
          setCartItems([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      className={styles.cardPage}
      sx={{
        "& .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid  gray !important",
          borderRadius: "4px",
        },
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "2px solid #C86823 !important",
          borderRadius: "4px",
        },
        "& .Mui-selected > .MuiOutlinedInput-notchedOutline ": {
          border: "2px solid #C86823 !important",
          borderRadius: "4px",
        },
        "& .Mui-focused.MuiFormLabel-root ": {
          color: "#C86823 !important",
        },
        ".MuiFormLabel-root": {
          fontSize: "1.1rem",
        },
      }}
    >
      <ToastContainer />
      <div className={styles.cardWrapper}>
        <p className={styles.titleCard}>Checkout your Order</p>
        <form className={styles.form} onSubmit={(e) => SendOrder(e)}>
          <div className={styles.price}>
            <p>Price</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={`${styles.deliveryPart} ${styles.form}`}>
            <FormControl
              required
              fullWidth
              sx={{
                minWidth: 50,
              }}
            >
              <InputLabel htmlFor="Country">Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e)}
                sx={{ minWidth: 50 }}
                name="Country"
                label="Country"
              >
                {isDeliveryPending ? (
                  <MenuItem disabled>Loading delivery options...</MenuItem>
                ) : isDeliveryError ? (
                  <MenuItem disabled>Error loading delivery options</MenuItem>
                ) : (
                  [
                    ...new Set(deliveryData.map((option) => option.country)),
                  ].map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                minWidth: 50,
              }}
              required
            >
              <InputLabel htmlFor="City">City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => handleCityChange(e)}
                sx={{ minWidth: 50 }}
                name="City"
                label="City"
                disabled={!selectedCountry}
              >
                {isDeliveryPending ? (
                  <MenuItem disabled>Loading cities...</MenuItem>
                ) : isDeliveryError ? (
                  <MenuItem disabled>Error loading cities</MenuItem>
                ) : (
                  deliveryData
                    .filter(
                      (deliveryOption) =>
                        deliveryOption.country === selectedCountry
                    )
                    .map((filteredOption) => (
                      <MenuItem
                        key={filteredOption._id}
                        value={filteredOption.city}
                      >
                        {filteredOption.city}
                      </MenuItem>
                    ))
                )}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p>
              {selectedPrice !== null
                ? `Delivery Fees: $${selectedPrice.toFixed(2)}`
                : "Please select a country and city to see the delivery fees."}
            </p>
          </div>
          <div className={styles.totalPrice}>
            <p>Total Price</p>
            <div>${(totalPrice + selectedPrice).toFixed(2)}</div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#C86823",
                textTransform: "none",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  bgcolor: "#A0471D",
                  color: "white",
                },
              }}
            >
              Checkout
            </Button>
          </div>
        </form>
      </div>
      <NoteModal openNote={openNote} handleClose={() => setOpenNote(false)} />
    </Box>
  );
}
