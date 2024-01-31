import Modal from "@mui/material/Modal";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import axios from "axios";
import useApi from "../../Hooks/UseApi";

const DeliveryModal = ({
  open,
  handleClose,
  selectedRowData,
  refetch,
  action,
}) => {
  const [city, setCity] = useState(
    action === "edit" ? selectedRowData.city : ""
  );
  const [country, setCountry] = useState(
    action === "edit" ? selectedRowData.country : ""
  );
  const [price, setPrice] = useState(
    action === "edit" ? selectedRowData.price : ""
  );

  const { apiCall, loading, error } = useApi();

  useEffect(() => {
    if (action === "edit") {
      setCity(selectedRowData && selectedRowData.city);
      setCountry(selectedRowData && selectedRowData.country);
      setPrice(selectedRowData && selectedRowData.price);
    }
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/delivery",
        data: {
          city: city,
          country: country,
          price: price,
        },
        method: "post",
      });
      handleClose();
      toast.success(`Delievry Fee added Successfuly 😍`);
      await refetch();
    } catch (error) {
      toast.error(`An Error Occured`);
      console.log(error);
    }
  };

  const hanedleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/delivery",
        data: {
          city: city,
          country: country,
          price: price,
        },
        method: "patch",
      });
      if (response.status === 200) {
        handleClose();
        toast.success(`Delievry Fee updated Successfuly 😍`);
        await refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error Occured");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "add") {
      handleAdd(e);
    } else if (action === "edit") {
      hanedleEdit(e);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "white",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiOutlinedInput-notchedOutline ": {
            border: "1.5px solid  gray !important",
            borderRadius: "4px",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
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
        <Box sx={style}>
          <div style={divStyle}>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#C86823 !important",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {action === "add" ? "Add Delivery Fee" : "Edit Delivery Fee"}
            </Typography>
            <IconButton
              style={span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                sx={{
                  color: "#C86823",
                }}
              />
            </IconButton>
          </div>
          <Stack rowGap={"2rem"} mb={"1rem"}>
            <TextField
              required
              id="outlined-required1"
              label="Country"
              placeholder="Country"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              autoComplete="on"
            />
            <TextField
              required
              id="outlined-required2"
              label="City"
              placeholder="City"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              autoComplete="on"
            />
            <TextField
              required
              type="number"
              id="outlined-required3"
              label="Price"
              placeholder="Price $$"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              autoComplete="on"
            />
            {error && (
              <p
                style={{
                  color: "red",
                }}
              >
                An error occured
              </p>
            )}
          </Stack>
          {!loading ? (
            <>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#C86823 !important",
                  textTransform: "none",
                }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <LoadingButton
                loading
                variant="contained"
                sx={{
                  bgcolor: "transparent",
                  borderColor: "#C86823",
                }}
              >
                Submit
              </LoadingButton>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DeliveryModal;
