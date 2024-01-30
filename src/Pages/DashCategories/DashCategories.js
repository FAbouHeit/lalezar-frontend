import React, { useState } from "react";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyleDashCategories from "./DashCategories.module.css";
import { FormControl, TextField, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashCategories() {
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
    name_AR: "",
  });

  const {
    isPending: isCategoriesPending,
    error: categoriesError,
    data: categoriesData,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}categories`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
  });

  if (categoriesError) {
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

  if (isCategoriesPending) {
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
    const { name, type, checked } = e.target;
    // Check if the input type is file for handling images
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : e.target.value,
      }));
    }
  };

  const handleOpenPopUp = () => {
    setIsAddPopUp(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/create`,
        formData
      );
      toast.success(`the Category added successfuly 😍`);
      // console.log(response.data);
      setIsAddPopUp(false);
      await refetchCategories();
      setFormData({
        name: "",
        name_AR: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error adding Category 😢`);
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
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/delete/${selectedRowData._id}`
      );

      // console.log(response.data)
      toast.success(`The Category deleted successfuly`);
      setIsDeletePopUp(false);
      await refetchCategories();
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting Category 😢`);
    }
  };

  const handleEditOpen = (selectedRowData) => {
    setIsEditPopUp(true);
    setFormData({
      name: selectedRowData.name,
      name_AR: selectedRowData.name_AR,
    });
    // console.log("hi" , selectedRowData.image)
  };
  const handleEditClose = () => {
    setIsEditPopUp(false);
    setFormData({
      name: "",
      name_AR: "",
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
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/update/${selectedRowData._id}`,
        formData
      );
      // console.log(response.data);
      toast.success(`the Category updated successfuly`);
      setIsEditPopUp(false);
      await refetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(`Error updating Category`);
    }
  };

  return (
    <>
      {isAddPopUp && (
        <>
          <div className={StyleDashCategories.addPopUp}>
            <h1 style={{ marginBottom: "15px" }}>Add A Category</h1>
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
                  label="Name_AR"
                  name="name_AR"
                  value={formData.name_AR}
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
          <div className={StyleDashCategories.addPopUp}>
            <h1 style={{ marginBottom: "20px" }}>Edit a category</h1>
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
                  label="Name_AR"
                  name="name_AR"
                  // value={formData.name_AR}
                  defaultValue={formData.name_AR}
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
                Are you sure to Delete this Category?
                <span style={{ color: "red" }}>
                  because of this action , You will have products without
                  Category.
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
                  className={StyleDashCategories.cancel}
                >
                  Confirm
                </button>
                <button
                  onClick={handleClose}
                  className={StyleDashCategories.confirm}
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
        <button
          className={StyleDashCategories.addToCart}
          onClick={handleOpenPopUp}
        >
          Add A Category
        </button>
        <Table
          data={categoriesData}
          ForWhat={"categories"}
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

export default DashCategories;
