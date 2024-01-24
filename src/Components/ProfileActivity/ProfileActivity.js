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
        fontFamily: "Helvetica Neue",
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
            color: "#088395",
          },
          ".MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary": {
          fontFamily:"Helvetica Neue",
          fontSize: "0.95rem !important",
        },
        "& .MuiTabs-indicator ": {
          bgcolor: "#088395",
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
            fontFamily: "Helvetica Neue",
          }}
        >
          {userData &&
          (userData.role === "Admin" || userData.role === "Manager") ? (
            <TabList
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Hotels" value="0" />
              <Tab label="Rooms" value="1" />
            </TabList>
          ) : (
            <TabList
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Reservations" value="0" />
              <Tab label="Ratings" value="1" />
            </TabList>
          )}
        </Box>
        {userData &&
        (userData.role === "Admin" || userData.role === "Manager") ? (
          <Box>
            <TabPanel key={value} value={value}>
              {value === "0" ? (
                <>
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
                </>
              ) : value === "1" ? (
                <>
                  {userData &&
                    userData.Rooms.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    ).map((room, index) => (
                      <ActivityCard key={room.id} room={room}/>

                    ))}
                  <Pagination
                    count={Math.ceil(
                      userData && userData.Rooms.length / itemsPerPage
                    )}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                  />
                </>
              ) : (
                ""
              )}
            </TabPanel>
          </Box>
        ) : (
          <Box>
            <TabPanel key={value} value={value}>
              {value === "0" ? (
                <>
                  {userData &&
                    userData.Reservations.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    ).map((reservation, index) => (
                      <ActivityCard key={reservation.id} reservation={reservation}/>

                    ))}
                  <Pagination
                    count={Math.ceil(
                      userData && userData.Reservations.length / itemsPerPage
                    )}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                  />
                </>
              ) : value === "1" ? (
                <>
                  {userData &&
                    userData.Ratings.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    ).map((rating, index) => (
                      <ActivityCard key={rating.id} rating={rating}/>

                    ))}
                  <Pagination
                    count={Math.ceil(
                      userData && userData.Ratings.length / itemsPerPage
                    )}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                  />
                </>
              ) : (
                ""
              )}
            </TabPanel>
          </Box>
        )}
      </TabContext>
    </Box>
  );
};

export default ProfileActivity;
