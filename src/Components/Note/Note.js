import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NoteModal = ({ openNote, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25rem",
    bgcolor: "white",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "20rem",
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
        open={openNote}
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
            Oops, You are not logged in
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            sx={{
              mb: "2rem",
            }}
          >
            Login to your account
          </Typography>
          <span
            style={{
              width: "50%",
              display: "flex",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#C86823",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    bgcolor: "#A0471D",
                    color: "white",
                  },
                  textTransform: 'none'
                }}
              >
                Login
              </Button>
            </Link>
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default NoteModal;
