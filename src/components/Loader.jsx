import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box className="loader-container">
      <CircularProgress
        sx={{
          color: "#667eea",
        }}
      />
      <p className="loader-text">{message}</p>
    </Box>
  );
};

export default Loader;
