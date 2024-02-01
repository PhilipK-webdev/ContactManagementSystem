import React from "react";
import { CircularProgress, Box } from "@mui/material";
const Spinner = ({ size, color }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={size} style={{ color }} />
    </Box>
  );
};

export default Spinner;
