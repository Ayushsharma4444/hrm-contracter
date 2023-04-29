import React, { useEffect } from 'react'
import BarChart from '../../components/BarChart'
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material';
// import { tokens } from '../../theme';
const Bar = () => {
    const navigate = useNavigate();

    useEffect(() => {
      console.log("inside this function");
      if (!localStorage.getItem("Token")) {
        navigate("/login");
      }
    }, []);
    // const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    return (
        <Box m="20px" height="75vh">
            <Header title="BAR CHART" subtitle="simple bar chart" />
            <BarChart />
        </Box>
    )
}

export default Bar