import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const TopCountrisChart = ({
  countriesData,
  countryOption,
  setCountryOption,
}) => {
  const options = {
    series: [
      {
        name: "Orders",
        data: countriesData ? countriesData.yaxis : [],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      intersect: false,
      shared: true,
    },
    fill: {
      opacity: 1,
      colors: ["#C86823"],
      borderRadius: 5,
    },
    plotOptions: {
      bar: {
        columnWidth: "55%",
        endingShape: "rounded",
        horizontal: false,
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: countriesData ? countriesData.xaxis : [],
    },
    yaxis: {
      title: {
        text: "Orders",
      },
    },
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
        paddingBottom: "0",
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
        }}
      >
        {countryOption === "country"
          ? "Top Countires Sold for"
          : countryOption === "city"
          ? "Top Cities Sold For"
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
          value={countryOption}
          onChange={(e) => {
            setCountryOption(e.target.value);
          }}
        >
          <MenuItem disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"country"}>Top Countries</MenuItem>
          <MenuItem value={"city"}>Top Cities</MenuItem>
        </Select>
      </FormControl>
      <Chart
        options={options}
        series={options.series}
        width={"100%"}
        height={300}
        type="bar"
      />
    </Box>
  );
};

export default TopCountrisChart;
