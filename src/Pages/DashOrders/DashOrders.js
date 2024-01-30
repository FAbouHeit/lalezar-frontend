import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import DeleteOrderModal from "../../Components/OrderModal/DeleteOrder";
import OrderModal from "../../Components/OrderModal/OrderModal";
import { ToastContainer } from "react-toastify";

const DashOrder = () => {
  const [selectedRowData, setSelectedRowData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {
    isPending: isOrderPending,
    isError: isOrderError,
    data: orderData,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["OrderData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}order`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
  });

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
    >
      <ToastContainer />
      <Helmet>
        <title>All Hotels Overview</title>
        <meta
          name="description"
          content="View a comprehensive overview of all hotels within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple hotel properties in one convenient dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All Hotels Overview" />
        <meta
          property="og:description"
          content="View a comprehensive overview of all hotels within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple hotel properties in one convenient dashboard."
        />
      </Helmet>
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          mt: "2rem",
          fontWeight: "bold",
        }}
      >
        Manage Orders
      </Typography>
      {isOrderPending ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontFamily="Helvetica Neue">
            Loading...
          </Typography>
        </div>
      ) : isOrderError ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error">
            Error loading data
          </Typography>
        </div>
      ) : (
        <>
          <Table
            data={orderData && orderData}
            isEdit={true}
            setSelectedRowData={setSelectedRowData}
            handleOpenDelete={() => setOpenDelete(true)}
            handleEditOpen={() => setOpenEdit(true)}
            ForWhat={"orders"}
          />
          <DeleteOrderModal
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            selectedRowData={selectedRowData && selectedRowData}
            refetch={() => refetchOrders()}
          />
          <OrderModal
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            selectedRowData={selectedRowData}
            refetch={() => refetchOrders()}
          />
        </>
      )}
    </Box>
  );
};

export default DashOrder;
