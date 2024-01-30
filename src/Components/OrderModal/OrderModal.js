import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useApi from "../../Hooks/UseApi";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

const OrderModal = ({ open, handleClose, selectedRowData, refetch }) => {
  const { apiCall, loading, error } = useApi();
  const { user } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState(selectedRowData.status);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/order",
        method: "patch",
        data: {
          id: selectedRowData && selectedRowData._id,
          status: orderStatus,
        },
      });
      handleClose();
      toast.success(`Order Updated Successfuly 😍`);
      await refetch();
    } catch (error) {
      console.log(error);
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
          '& .MuiSvgIcon-root':  {
            color : '#C86823'
          }
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
              Edit Order
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
          <FormControl
            required
            sx={{
              "& .MuiSvgIcon-root": {
                color: "white",
                "& .MuiList-root": {
                  bgcolor: "transparent",
                },
              },
              m : "2rem 0"
            }}
          >
            <InputLabel htmlFor="demo-simple-select-required">
              Status
            </InputLabel>
            <Select
              id="demo-simple-select-required"
              value={orderStatus}
              label="Status *"
              name="status"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <MenuItem disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Initiated"}>Initiated</MenuItem>
              <MenuItem value={"In Process"}>In Process</MenuItem>
              <MenuItem value={"Sent"}>Sent</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Declined"}>Declined</MenuItem>
            </Select>
          </FormControl>
          {!loading ? (
            <>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                size="large"
                sx={{
                  bgcolor: "#C86823 !important",
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

export default OrderModal;
