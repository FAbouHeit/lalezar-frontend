import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

const ProfileDetails = ({ userData }) => {
  const formatDate = (date) => {
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        mb: "2rem",
        borderRadius: "10px",
        padding: "2.3rem 0 0 0",
        display: "flex",
        flexDirection: "column",
        zIndex: 0,
      }}
    >
      <Typography
        component="h3"
        variant="h3"
        fontSize="1.1rem"
        lineHeight="2.7rem"
        borderBottom="1px solid rgba(0, 0, 0, 0.12)"
      >
        <span style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          color: '#C86823',
          borderBottom: '2px solid #C86823',
          display:'flex',
          height: '100%',
          width: 'fit-content'
        }}>User Details</span>
      </Typography>
      <Stack>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            First Name :{" "}
          </span>{" "}
          {userData && userData.firstName}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            Last Name :{" "}
          </span>{" "}
          {userData && userData.lastName}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            Email :{" "}
          </span>{" "}
          {userData && userData.email}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            Joined Since:{" "}
          </span>{" "}
          {userData && formatDate(userData.createdAt)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProfileDetails;
