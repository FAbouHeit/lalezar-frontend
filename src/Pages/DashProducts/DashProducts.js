import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyleDashProducts from "./DashProducts.module.css";
import {
  FormControl,
  TextField,
  Button,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Stack,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

function DashProducts() {
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    name_AR: "",
    image: "",
    description: "",
    description_AR: "",
    price: 0,
    weight: 0,
    slug: "",
    ingredients: "",
    ingredients_AR: "",
    stock: false,
    display: false,
    category: "",
    color: "",
  });

  const handleOpenPopUp = () => {
    setIsAddPopUp(true);
  };

  const {
    isPending: isProductsPending,
    error: productsError,
    data: productsData,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["productsData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}products`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  const {
    isPending: isCategoriesPending,
    error: categoriesError,
    data: categoriesData,
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

  const {
    isPending: isColorsPending,
    error: colorsError,
    data: colorsData,
  } = useQuery({
    queryKey: ["colorsData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}colors`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching colors:", error);
        throw error;
      }
    },
  });

  if (isColorsPending || isCategoriesPending || isProductsPending) {
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

  if (colorsError || categoriesError || productsError) {
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}products/create`,
        formDataToSend
      );
      toast.success(`the Product added successfuly 😍`);
      // console.log(response.data);
      setIsAddPopUp(false);
      await refetchProducts();
      setFormData({
        name: "",
        name_AR: "",
        image: "",
        description: "",
        description_AR: "",
        price: 0,
        weight: 0,
        slug: "",
        ingredients: "",
        ingredients_AR: "",
        stock: false,
        display: false,
        category: "",
        color: "",
      });
    } catch (error) {
      console.log(error);
      // toast.error("Error adding user");
      toast.error(`Error adding Product 😢`);
    }
  };

  const handleEditClose = () => {
    setIsEditPopUp(false);
    setFormData({
      name: "",
      name_AR: "",
      image: "",
      description: "",
      description_AR: "",
      price: 0,
      weight: 0,
      slug: "",
      ingredients: "",
      ingredients_AR: "",
      stock: false,
      display: false,
      category: "",
      color: "",
    });
  };

  const handleEditOpen = (selectedRowData) => {
    setIsEditPopUp(true);
    setFormData({
      name: selectedRowData.name,
      name_AR: selectedRowData.name_AR,
      image: selectedRowData.image,
      description: selectedRowData.description,
      description_AR: selectedRowData.description_AR,
      price: selectedRowData.price,
      weight: selectedRowData.weight,
      slug: selectedRowData.slug,
      ingredients: selectedRowData.ingredients,
      ingredients_AR: selectedRowData.ingredients_AR,
      stock: selectedRowData.stock,
      display: selectedRowData.display,
      category: selectedRowData.category._id,
      color: selectedRowData.color._id,
    });
    // console.log("hi" , selectedRowData.image)
  };

  const handleUpdate = async (selectedRowData) => {
    try {
      const updatedFormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          updatedFormData.append(key, formData[key]);
        }
      });
      if (formData.image) {
        updatedFormData.append("image", formData.image);
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}products/update/${selectedRowData._id}`,
        updatedFormData
      );

      // console.log(response.data);
      toast.success(`the Product updated successfuly 😍`);
      setIsEditPopUp(false);
      await refetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(`Error updating Product 😢`);
    }
  };

  const handleDelete = async (selectedRowData) => {
    // console.log("hi")
    // console.log(selectedRowData._id)
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}products/delete/${selectedRowData._id}`
      );

      // console.log(response.data)
      toast.success(`the Product deleted successfuly 😍`);
      setIsDeletePopUp(false);
      await refetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting Product 😢`);
    }
  };

  const handleOpen = (selectedRowData) => {
    // console.log("hi")
    // console.log(selectedRowData._id)
    setIsDeletePopUp(true);
  };
  const handleClose = () => setIsDeletePopUp(false);

  const diplay = screenWidth < 650 ? "column" : "row";
  const width = screenWidth < 650 ? "100%" : "50%";
  const scroll = screenWidth < 650 ? "scroll" : "";
  return (
    <>
      {isAddPopUp && (
        <>
          <Box
            className={StyleDashProducts.addPopUp}
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
            }}
          >
            <h1
              style={{
                width: "100%",
                textAlign: "left",
                marginBottom: "1.5rem",
              }}
            >
              Add A Product
            </h1>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: diplay,
                columnGap: "1rem",
                width: "100%",
                rowGap: "1rem",
                overflow: scroll,
                paddingTop: "0.5rem",
              }}
            >
              <Stack rowGap="2rem" width={width}>
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
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {isCategoriesPending ? (
                      <MenuItem disabled>Loading categories...</MenuItem>
                    ) : categoriesError ? (
                      <MenuItem disabled>Error loading categories</MenuItem>
                    ) : (
                      categoriesData.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                {screenWidth > 650 && (
                  <>
                    <FormControl fullWidth>
                      <FormControlLabel
                        label="Stock"
                        control={
                          <Switch
                            name="stock"
                            id="stock"
                            checked={formData.stock}
                            onChange={handleChange}
                            label="Stock"
                          />
                        }
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#A0471D",
                          color: "white",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Stack>

              <Stack rowGap={"2rem"} width={width}>
                <FormControl fullWidth>
                  <TextField
                    label="Name_AR"
                    name="name_AR"
                    value={formData.name_AR}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Description_AR"
                    name="description_AR"
                    value={formData.description_AR}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Weight"
                    name="weight"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Ingredients_AR"
                    name="ingredients_AR"
                    value={formData.ingredients_AR}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="color">Color</InputLabel>
                  <Select
                    label="Color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    {isColorsPending ? (
                      <MenuItem disabled>Loading colors...</MenuItem>
                    ) : colorsError ? (
                      <MenuItem disabled>Error loading colors</MenuItem>
                    ) : (
                      colorsData.map((color) => (
                        <MenuItem
                          key={color._id}
                          value={color._id}
                          style={{ display: "flex", gap: "20px" }}
                        >
                          {color.name}
                          <div
                            style={{
                              border: "1px solid black",
                              width: "20px",
                              height: "20px",
                              backgroundColor: `${color.hex}`,
                            }}
                          ></div>
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  {/* <InputLabel htmlFor="image">Image</InputLabel> */}
                  {/* <Input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  /> */}
                  <input
                    className={StyleDashProducts.input}
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormControlLabel
                    label="Display"
                    control={
                      <Switch
                        name="display"
                        checked={formData.display}
                        onChange={handleChange}
                      />
                    }
                  />
                </FormControl>
                {screenWidth < 650 && (
                  <>
                    <FormControl fullWidth>
                      <FormControlLabel
                        label="Stock"
                        control={
                          <Switch
                            name="stock"
                            id="stock"
                            checked={formData.stock}
                            onChange={handleChange}
                            label="Stock"
                          />
                        }
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#A0471D",
                          color: "white",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Stack>
            </form>
          </Box>
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
          <div className={StyleDashProducts.addPopUp}>
            <h1>Editttt</h1>
            <form
              // onSubmit={handleUpdate}
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

              <FormControl fullWidth>
                <TextField
                  label="Slug"
                  name="slug"
                  // value={formData.slug}
                  defaultValue={formData.slug}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Description"
                  name="description"
                  // value={formData.description}
                  defaultValue={formData.description}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Description_AR"
                  name="description_AR"
                  // value={formData.description_AR}
                  defaultValue={formData.description_AR}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  inputProps={{ min: 0 }}
                  // value={formData.price}
                  defaultValue={formData.price}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Weight"
                  name="weight"
                  type="number"
                  inputProps={{ min: 0 }}
                  // value={formData.weight}
                  defaultValue={formData.weight}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl
                fullWidth
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                {selectedRowData.image && (
                  <img
                    src={`${process.env.REACT_APP_IMAGE_PATH}/${selectedRowData.image}`}
                    alt="Product"
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  />
                )}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  // value={formData.ingredients}
                  defaultValue={formData.ingredients}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Ingredients_AR"
                  name="ingredients_AR"
                  // value={formData.ingredients_AR}
                  defaultValue={formData.ingredients_AR}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              {/* Add other form fields similarly */}

              <FormControl fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  // value={formData.category}
                  defaultValue={formData.category}
                  onChange={handleChange}
                >
                  {isCategoriesPending ? (
                    <MenuItem disabled>Loading categories...</MenuItem>
                  ) : categoriesError ? (
                    <MenuItem disabled>Error loading categories</MenuItem>
                  ) : (
                    categoriesData.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="color">Color</InputLabel>
                <Select
                  label="Color"
                  name="color"
                  // value={formData.color}
                  defaultValue={formData.color}
                  onChange={handleChange}
                >
                  {isColorsPending ? (
                    <MenuItem disabled>Loading colors...</MenuItem>
                  ) : colorsError ? (
                    <MenuItem disabled>Error loading colors</MenuItem>
                  ) : (
                    colorsData.map((color) => (
                      <MenuItem
                        key={color._id}
                        value={color._id}
                        style={{ display: "flex", gap: "20px" }}
                      >
                        {color.name}
                        <div
                          style={{
                            border: "1px solid black",
                            width: "20px",
                            height: "20px",
                            backgroundColor: `${color.hex}`,
                          }}
                        ></div>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="stock">Stock</InputLabel>
                <Switch
                  name="stock"
                  checked={formData.stock}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="display">Display</InputLabel>
                <Switch
                  name="display"
                  checked={formData.display}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                onClick={() => handleUpdate(selectedRowData)}
                variant="contained"
                color="primary"
              >
                Update
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
            onClick={handleEditClose}
          ></div>
        </>
      )}
      {isDeletePopUp && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={handleOpen}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={handleOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Are you sure to Delete this Product?
              </Typography>
              {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
              <div
                style={{
                  display: "flex",
                  columnGap: "20px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => handleDelete(selectedRowData)}
                  className={StyleDashProducts.cancel}
                >
                  Confirm
                </button>
                <button
                  onClick={handleClose}
                  className={StyleDashProducts.confirm}
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
            mt: "2rem",
            fontWeight: "bold",
          }}
        >
          Manage Products
        </Typography>
        <Button
          onClick={handleOpenPopUp}
          endIcon={<AddIcon />}
          variant="contained"
          size="big"
          sx={{
            bgcolor: "#C86823",
            transition: "background-color 0.3s ease, color 0.3s ease",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#A0471D",
              color: "white",
            },
            mt: '2rem'
          }}
        >
          Add Product
        </Button>
        <Table
          data={productsData}
          ForWhat={"products"}
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

export default DashProducts;
