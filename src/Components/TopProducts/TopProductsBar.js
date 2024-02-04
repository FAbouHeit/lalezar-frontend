import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const TopProductsChart = ({ productData, productOption, setProductOption }) => {
  const options = {
    series: [
      {
        name: productOption === "sold" ? "Orders" : "Revenue",
        data: productData ? productData.yaxis : [],
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
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    xaxis: {
      categories: productData ? productData.xaxis : [],
    },
    yaxis: {
      title: {
        text: productOption === "sold" ? "Orders" : "Revenue in $$",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        boxShadow : '0 0 3px gray' ,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgb(231, 231, 231)",
        padding: "1rem",
        paddingBottom: "0",
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
        {productOption === "sold"
          ? "Top Sold Products"
          : productOption === "seller"
          ? "Top Seller Products"
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
          value={productOption}
          onChange={(e) => {
            setProductOption(e.target.value);
          }}
        >
          <MenuItem disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"sold"}>Top Sold</MenuItem>
          <MenuItem value={"seller"}>Top Seller</MenuItem>
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

export default TopProductsChart;
