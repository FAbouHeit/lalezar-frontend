import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const UserChart = ({ userData }) => {
  const options = {
    series: userData ? userData.ordersCount : [],
    chart: {
      type: "pie",
      height: 350,
      animations: {
        enabled: true,
      },
      stroke: 0,
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      opacity: 1,
      colors: ["#C86823", "#740004", "#fff", "#49220E", "#A0471D"],
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      colors: ["#C86823", "#740004", "#fff", "#49220E", "#A0471D"],
      itemMargin: {
        horizontal: 15,
        vertical: 5,
        colors: ["#C86823", "#740004", "#fff", "#49220E", "#A0471D"],
      },
      data: userData ? userData.names : [],
    },
    labels: userData ? userData.names : [],
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgb(231, 231, 231)",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 0 3px gray",
        "& .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid  #C86823 !important",
          borderRadius: "4px",
        },
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "2.5px solid #C86823 !important",
          borderRadius: "4px",
        },
        "& .Mui-focused.MuiFormLabel-root ": {
          color: "#C86823 !important",
        },
        "& .MuiSvgIcon-root": {
          color: "#C86823",
        },
      }}
    >
      <Typography
        variant="p"
        component="p"
        sx={{
          color: "#C86823 !important",
          fontSize: "1.5rem",
          fontWeight: "bold",
          mb: "1rem",
        }}
      >
        Top 5 Users
      </Typography>
      <Chart
        options={options}
        series={options.series}
        width={"100%"}
        height={400}
        type="pie"
      />
    </Box>
  );
};

export default UserChart;
