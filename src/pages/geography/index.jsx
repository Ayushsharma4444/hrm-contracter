import React, { useEffect } from "react";
import GeographyChart from "../../components/GeographyChart";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
const Geography = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside this function");
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

  
  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="Line CHART" subtitle="simple line chart" />
      <GeographyChart />
    </Box>
  );
};

export default Geography;
