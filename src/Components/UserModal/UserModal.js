import Modal from "@mui/material/Modal";
import { Box, FormControl, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useApi from "../../Hooks/UseApi";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast, ToastContainer } from "react-toastify";
import Styles from "./UserModal.module.css";
import Img from "../../Assets/ImgHolder.jpg";
import axios from "axios";
import axiosInstance from "../../Utils/AxiosInstance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

const UserModal = ({
    open,
    handleClose,
    selectedRowData,
    refetch,
    action,
}) => {
    const [firstName, setFirstName] = useState(
        action === "edit" ? selectedRowData.firstName : ""
    );
    const [lastName, setLastName] = useState(
        action === "edit" ? selectedRowData.lastName : ""
    );
    const [email, setEmail] = useState(
        action === "edit" ? selectedRowData.email : ""
    );
    const [phoneNumber, setPhoneNumber] = useState(
        action === "edit" ? selectedRowData.phoneNumber : ""
    );


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [oldPassword, setOldPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        if (action === 'edit') {
            setFirstName(selectedRowData && selectedRowData.firstName)
            setLastName(selectedRowData && selectedRowData.lastName)
            setEmail(selectedRowData && selectedRowData.email)
            setPhoneNumber(selectedRowData && selectedRowData.phoneNumber)
            // setPassword(selectedRowData && selectedRowData.password)
        }
    }, [selectedRowData, action])


  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axiosInstance.post(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}user`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
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
                toast.success(`User added Successfuly 😍`);
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
    const conditionPassword = newPassword !== null ? newPassword : null;

    const hanedleEdit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}user`,
                {
                    id: selectedRowData._id,
                    firstName: firstName,
                    lastName: lastName,
                    password: conditionPassword,
                    checkPassword: oldPassword,
                    email: email,
                    phoneNumber: phoneNumber,
                    image: image,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200) {
                toast.success(`User Updated Successfuly 😍`);
                handleClose();
                console.log(response)
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
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const isValidPassword =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(password);
        
            if (!isValidEmail) {
              setEmailError(" Please enter a valid email address");
              setLoading(false);
              showToast("Invalid email address");
            }
        
            if (!isValidPassword) {
              setPasswordError(
                "Password must be at least 8 characters long and contain at least one letter and one number"
              );
              setLoading(false);
              showToast("Invalid password");
              return;
            }
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
        alignItems: "left",
        maxHeight: "600px",
        overflowY: "scroll",
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
          <ToastContainer />
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
                            {action === "add" ? "Add User" : "Edit User"}
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
                            label="firstName"
                            placeholder="First Name"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            autoComplete="on"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#C86823",
                                },
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required1"
                            label="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            autoComplete="on"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#C86823",
                                },
                            }}
                        />

                        <TextField
                            required
                            id="outlined-required1"
                            label="email"
                            placeholder="Email"
                            name="email"
                            helperText={!emailError ? "": emailError}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            autoComplete="on"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#C86823",
                                },
                            }}
                            onBlur={() => {
                                // Validate email on blur
                                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                  email
                                );
                                if (!isValidEmail) {
                                  setEmailError("Please enter a valid email address");
                                }
                              }}
                        />
                        {!selectedRowData ? (
                            <TextField
                                required
                                id="outlined-required1"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                helperText={!passwordError ? "": passwordError}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete="on"
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#C86823", 
                                    },
                                }}
                                onBlur={() => {
                                    // Validate password on blur
                                    const isValidPassword =
                                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
                                    if (!isValidPassword) {
                                      setPasswordError(
                                        "Password must be at least 8 characters long and contain at least one letter and one number"
                                      );
                                    }
                                  }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                style={{ color: "#C86823" }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        ) : (
                            <>
                                <TextField
                                    required
                                    id="outlined-required1"
                                    label="Old Password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    autoComplete="on"
                                    sx={{
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#C86823", // Change border color on focus
                                        },
                                    }}
                                    onBlur={() => {
                                        // Validate password on blur
                                        const isValidPassword =
                                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
                                        if (!isValidPassword) {
                                          setPasswordError(
                                            "Password must be at least 8 characters long and contain at least one letter and one number"
                                          );
                                        }
                                      }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    style={{ color: "#C86823" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    required
                                    id="outlined-required1"
                                    label="New Password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    helperText={!passwordError ? "": passwordError}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoComplete="on"
                                    sx={{
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#C86823", 
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    style={{ color: "#C86823" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </>
                        )}
                        <TextField
                            required
                            id="outlined-required1"
                            label="phoneNumber"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            autoComplete="on"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#C86823",
                                },
                            }}
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
                                            : selectedRowData.image ? `${process.env.REACT_APP_IMAGE_PATH}${selectedRowData.image}`
                                                : Img
                                    }
                                    width={"100%"}
                                    height={"300px"}
                                />
                            )}
                            {action === "add" && (
                                <img
                                    style={{
                                        margin: "1rem auto",
                                    }}
                                    src={image ? URL.createObjectURL(image) : Img}
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

export default UserModal;