import React, { useState } from "react";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyleDashColors from "./DashColors.module.css";
import { FormControl, TextField, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";

function DashColors() {
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [formData, setFormData] = useState({
    name: "",
    hex: "",
  });

  const {
    isPending: isColorsPending,
    error: colorsError,
    data: colorsData,
    refetch: refetchColors,
  } = useQuery({
    queryKey: ["colorsData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}colors`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching colors", error);
        throw error;
      }
    },
  });

  if (colorsError) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>An error occured while fetching Data</h1>
      </div>
    );
  }

  if (isColorsPending) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading ...</h1>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : e.target.value,
    }));
  };

  const handleOpenPopUp = () => {
    setIsAddPopUp(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}colors/create`,
        formData
      );
      toast.success(`the Category added successfuly 😍`);
      // console.log(response.data);
      setIsAddPopUp(false);
      await refetchColors();
      setFormData({
        name: "",
        hex: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error adding Color 😢`);
    }
  };

  const handleOpen = (selectedRowData) => {
    // console.log("hi")
    // console.log(selectedRowData._id)
    setIsDeletePopUp(true);
  };

  const handleClose = () => setIsDeletePopUp(false);

  const handleDelete = async (selectedRowData) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}colors/delete/${selectedRowData._id}`
      );

      // console.log(response.data)
      toast.success(`The Color deleted successfuly`);
      setIsDeletePopUp(false);
      await refetchColors();
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting Color`);
    }
  };

  const handleEditOpen = (selectedRowData) => {
    setIsEditPopUp(true);
    setFormData({
      name: selectedRowData.name,
      hex: selectedRowData.hex,
    });
    // console.log("hi" , selectedRowData.image)
  };
  const handleEditClose = () => {
    setIsEditPopUp(false);
    setFormData({
      name: "",
      hex: "",
    });
  };

  const handleUpdate = async (selectedRowData) => {
    try {
      const updatedFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          updatedFormData.append(key, formData[key]);
        }
      });

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}colors/update/${selectedRowData._id}`,
        formData
      );
      // console.log(response.data);
      toast.success(`the Color updated successfuly`);
      setIsEditPopUp(false);
      await refetchColors();
    } catch (error) {
      console.error(error);
      toast.error(`Error updating Color 😢`);
    }
  };

  return (
    <>
      {isAddPopUp && (
        <>
          <div className={StyleDashColors.addPopUp}>
            <h1 style={{ marginBottom: "15px" }}>Add A Color</h1>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="HEX"
                  name="hex"
                  value={formData.hex}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1002,
            }}
            onClick={() => setIsAddPopUp(false)}
          ></div>
        </>
      )}
      {isEditPopUp && (
        <>
          <div className={StyleDashColors.addPopUp}>
            <h1 style={{ marginBottom: "20px" }}>Edit a color</h1>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  name="name"
                  // value={formData.name}
                  defaultValue={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="HEX"
                  name="hex"
                  // value={formData.name_AR}
                  defaultValue={formData.hex}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button
                onClick={() => handleUpdate(selectedRowData)}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button onClick={handleEditClose}>Cancel</Button>
            </form>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1002,
            }}
            onClick={handleEditClose}
          ></div>
        </>
      )}
      {isDeletePopUp && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isDeletePopUp}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          // slotProps={{
          //   backdrop: {
          //     timeout: 500,
          //   },
          // }}
        >
          <Fade in={isDeletePopUp}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Are you sure to Delete this Color?
                <span style={{ color: "red" }}>
                  May this affects the design
                </span>
              </Typography>
              <div
                style={{
                  display: "flex",
                  columnGap: "20px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => handleDelete(selectedRowData)}
                  className={StyleDashColors.cancel}
                >
                  Confirm
                </button>
                <button
                  onClick={handleClose}
                  className={StyleDashColors.confirm}
                >
                  Cancel
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
      <div
        style={{
          marginLeft: "5rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            mb: 5,
            mt: "2rem",
            fontWeight: "bold",
          }}
        >
          Manage Clients
        </Typography>
        <Button
          onClick={handleOpenPopUp}
          endIcon={<AddIcon />}
          variant="contained"
          sx={{
            bgcolor: "#C86823",
            transition: "background-color 0.3s ease, color 0.3s ease",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#A0471D",
              color: "white",
            },
          }}
        >
          Add Color
        </Button>
        <Table
          data={colorsData}
          ForWhat={"colors"}
          isEdit={true}
          handleEditOpen={handleEditOpen}
          setSelectedRowData={setSelectedRowData}
          handleOpenDelete={handleOpen}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default DashColors;
