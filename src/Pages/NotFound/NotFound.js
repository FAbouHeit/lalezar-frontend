import { Box, Button, Typography } from "@mui/material";
import video from "../../Assets/404Error.mp4";
import { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const TypoWidth =
    screenWidth < 600
      ? "100%"
      : screenWidth < 800
      ? "35%"
      : screenWidth < 1100
      ? "40%"
      : "45%";
  const videoWidth =
    screenWidth < 400
      ? "125%"
      : screenWidth < 600
      ? "100%"
      : screenWidth < 800
      ? "65%"
      : screenWidth < 1100
      ? "60%"
      : "55%";
  const alignDiv = screenWidth < 600 ? "center" : "";
  const videoDisplay = screenWidth < 300 ? "none" : "flex";

  return (
    <Box
      display="flex"
      flexDirection={screenWidth < 600 ? "column" : "row"}
      justifyContent={screenWidth < 600 ? "center" : "flex-start"}
      height="100vh"
      width="80%"
      margin="auto"
      alignItems={screenWidth < 600 ? "center" : ""}
    >
      <div
        style={{
          width: TypoWidth,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          alignItems: alignDiv,
        }}
      >
        <Typography
          variant="h1"
          fontSize={
            screenWidth < 800 ? "2rem" : screenWidth < 1100 ? "3rem" : "4rem"
          }
          mb={screenWidth < 600 ? "3rem" : "4rem"}
        >
          Opps, this page is not found!
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#C86823",
            ":hover": {
              bgcolor: "#A0471D",
            },
            width:
              screenWidth < 600
                ? "10rem"
                : screenWidth < 600
                ? "15rem"
                : screenWidth < 800
                ? "10rem"
                : "15rem",
            mb: screenWidth < 600 ? "2rem" : 0,
          }}
          startIcon={<KeyboardReturnIcon />}
          onClick={(e) => navigate('/')}
        >
          Return to home page
        </Button>
      </div>
      <video
        autoPlay
        muted
        width={videoWidth}
        style={{
          display: videoDisplay,
        }}
      >
        {" "}
        <source src={video} type="video/mp4" />
        Your browser doesn't support this video type
      </video>
    </Box>
  );
};

export default NotFound;
