import React from "react";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function DashCategories() {
  const {
    isPending: isCategoriesPending,
    error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}categories`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
  });

  if (categoriesError) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>An error occured while fetching Data</h1>
      </div>
    );
  }

  if (isCategoriesPending) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        marginLeft: "5rem",
      }}
    >
      <h1>Dashboard categories</h1>
      <Table
        data={categoriesData}
        ForWhat={"categories"}
        isEdit={true}
        // handleEditOpen={handleEditOpen}
        // setSelectedRowData={setSelectedRowData}
        // handleOpenDelete={handleOpen}
      />
    </div>
  );
}

export default DashCategories;
