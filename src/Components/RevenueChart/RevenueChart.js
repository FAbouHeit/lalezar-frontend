import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const RevenueChart = ({ data, option, setOption }) => {
  const options = {
    series: [
      {
        name: "Revenue",
        data: data || [1, 2],
      },
    ],
    chart: {
      type: "area",
      height: 350,
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#C86823"],
      width: 3,
    },
    fill: {
      opacity: 0.3,
      colors: "#C86823",
      type: "solid",
    },
    markers: {
      size: 5,
      hover: {
        size: 10,
      },
      colors: "#C86823",
    },
    tooltip: {
      intersect: false,
      shared: true,
    },
    xaxis: {
      type: "date",
    },
    yaxis: {
      title: {
        text: "Revenue in $$",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        mr: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgb(231, 231, 231)",
        boxShadow: "0 0 3px gray",
        padding: "1rem",
        borderRadius: "10px",
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
        }}
      >
        {option === "monthly"
          ? "Daily Revenue for the last month"
          : option === "weekly"
          ? "Daily Revenue for the last week"
          : option === "daily"
          ? "Hourly revenue for today"
          : ""}
      </Typography>
      <FormControl
        required
        sx={{
          width: "140px",
          m: "1rem 0",
        }}
      >
        <Select
          id="demo-simple-select-required"
          value={option}
          name="status"
          onChange={(e) => {
            setOption(e.target.value);
          }}
        >
          <MenuItem disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"monthly"}>Per Month</MenuItem>
          <MenuItem value={"weekly"}>Per Week</MenuItem>
          <MenuItem value={"daily"}>Per Day</MenuItem>
        </Select>
      </FormControl>
      <Chart
        options={options}
        series={options.series}
        width={"100%"}
        height={350}
        type="area"
      />
    </Box>
  );
};

export default RevenueChart;
