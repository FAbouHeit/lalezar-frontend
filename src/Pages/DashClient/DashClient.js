import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer } from "react-toastify";
import ClientModal from "../../Components/ClientModal/ClientModal";
import DeleteClientModal from "../../Components/ClientModal/DeleteClient";

const DashClient = () => {
  const [selectedRowData, setSelectedRowData] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {
    isPending: isClientPending,
    isError: isClientError,
    data: clientData,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ["clientData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}client`
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
          mb: 5,
          mt: "2rem",
          fontWeight: "bold",
        }}
      >
        Manage Clients
      </Typography>
      {isClientPending ? (
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
      ) : isClientError ? (
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
          <Button
            onClick={() => setOpenAdd(true)}
            endIcon={<AddIcon />}
            variant="contained"
            sx={{
              width: "8rem",
              bgcolor: "#C86823",
              transition: "background-color 0.3s ease, color 0.3s ease",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#A0471D",
                color: "white",
              },
            }}
          >
            Add Client
          </Button>
          <Table
            data={clientData && clientData}
            isEdit={true}
            setSelectedRowData={setSelectedRowData}
            handleOpenDelete={() => setOpenDelete(true)}
            handleEditOpen={() => setOpenEdit(true)}
            ForWhat={"clients"}
          />
          <DeleteClientModal
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            selectedRowData={selectedRowData && selectedRowData}
            refetch={() => refetchClients()}
          />
          <ClientModal
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            selectedRowData={selectedRowData}
            refetch={() => refetchClients()}
            action={"edit"}
          />
          <ClientModal
            open={openAdd}
            handleClose={() => setOpenAdd(false)}
            refetch={() => refetchClients()}
            action={"add"}
          />
        </>
      )}
    </Box>
  );
};

export default DashClient;
