import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useApi from "../../Hooks/UseApi";
import { toast, ToastContainer } from "react-toastify";

const DeleteUserModal = ({ open, handleClose, selectedRowData, refetch }) => {
  const { apiCall, loading, error } = useApi();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await apiCall({
        url: "/user",
        method: "delete",
        data: {
          id: selectedRowData && selectedRowData._id,
        },
      });
      toast.success(`User Deleted Successfuly 😍`);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
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
              Alert
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
          <Typography
            variant="p"
            component="p"
            fontSize="1.3rem"
            sx={{
              mb: "2rem",
              mt: "1.5rem",
            }}
          >
            {" "}
            Are you sure you want to delete this user?
          </Typography>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="large"
              sx={{
                bgcolor: "#C86823 !important",
              }}
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </Button>
          {error && <span>An error occured</span>}
        </Box>
      </Modal>
    </>
  );
};

export default DeleteUserModal;