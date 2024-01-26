import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import ActivityCard from "./ActivityCard";

const itemsPerPage = 5;

const ProfileActivity = ({ userData }) => {
  const defaultab = userData && userData.role === "Customer" ? "2" : "0";
  const [value, setValue] = React.useState(defaultab);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        typography: "body1",
        "& .MuiBox-root ": {
          width: "100%",
          height: "fit-content",
        },
        "& .MuiTabPanel-root": {
          width: "100%",
          backgroundColor: "white",
        },
        "& .MuiButtonBase-root": {
          color: "black",
        },
        "& .MuiTabPanel-root ": {
          borderRadius: "20px",
        },
        "& .  MuiTabs-indicator ": {
          marginLeft: "40px",
        },
        "& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected":
          {
            color: "#C86823",
          },
          ".MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary": {
          fontSize: "0.95rem !important",
        },
        "& .MuiTabs-indicator ": {
          bgcolor: "#C86823",
        },
        ".MuiPagination-ul": {
          marginTop: "1.5rem",
        },
        marginTop: "2rem",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            marginTop: 0,
  
          }}
        >
          {!userData ? (
            <TabList
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Products" value="0" />
            </TabList>
          ) : ""}
        </Box>
        {!userData? (
          <Box>
            <TabPanel key={value} value={value}>
                  {userData &&
                    userData.Hotels.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    ).map((hotel, index) => (
                      <ActivityCard key={hotel.id} hotel={hotel}/>
                    ))}
                  <Pagination
                    count={Math.ceil(
                      userData && userData.Hotels.length / itemsPerPage
                    )}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                  />
            </TabPanel>
          </Box>
        ) : "" }
      </TabContext>
    </Box>
  );
};

export default ProfileActivity;
