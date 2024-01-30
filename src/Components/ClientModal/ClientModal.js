import Modal from "@mui/material/Modal";
import { Box, FormControl, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useApi from "../../Hooks/UseApi";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import Styles from "./ClientModal.module.css";
import img from "../../Assets/ImgHolder.jpg";
import axios from "axios";
import axiosInstance from "../../Utils/AxiosInstance";

const ClientModal = ({
  open,
  handleClose,
  selectedRowData,
  refetch,
  action,
}) => {
  const [name, setName] = useState(
    action === "edit" ? selectedRowData.name : ""
  );
  const [location, setLocation] = useState(
    action === "edit" ? selectedRowData.location : ""
  );
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(()=>{
    if(action === 'edit'){
        setName(selectedRowData && selectedRowData.name)
        setLocation(selectedRowData && selectedRowData.location)
    }
  },)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}client`,
        {
          name: name,
          location: location,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        handleClose();
        toast.success(`Client added Successfuly 😍`);
        await refetch();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error(`An Error Occured`);
      console.log(error);
    }
  };

  const hanedleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}client`,
        {
          id: selectedRowData._id,
          name: name,
          image: image,
          location: location
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Client Updated Successfuly 😍`);
        handleClose();
        await refetch();
      }
      setLoading(false);
    } catch (error) {
      setError(true);
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
              {action === "add" ? "Add Client" : "Edit Client"}
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
          <Stack rowGap={"2rem"}>
            <TextField
              required
              id="outlined-required1"
              label="Name"
              placeholder="Client Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="on"
            />
            <TextField
              required
              id="outlined-required1"
              label="Location"
              placeholder="Client Location"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              autoComplete="on"
            />
            <FormControl>
              <input
                className={Styles.input}
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {action === "edit" && (
                <img
                  style={{
                    margin: "1rem auto",
                  }}
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `${process.env.REACT_APP_IMAGE_PATH}${selectedRowData.image}`
                  }
                  alt={name}
                  width={"100%"}
                  height={"300px"}
                />
              )}
              {action === "add" && (
                <img
                  style={{
                    margin: "1rem auto",
                  }}
                  src={image ? URL.createObjectURL(image) : img}
                  alt={name}
                  width={"100%"}
                  height={"300px"}
                />
              )}
            </FormControl>
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

export default ClientModal;
