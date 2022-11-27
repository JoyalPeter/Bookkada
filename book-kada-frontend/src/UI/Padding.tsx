import Box from "@mui/material/Box";
import React from "react";

const Padding: React.FC<any> = ({ children }) => (
  <Box
    sx={{
      m: 3,
    }}
  >
    {children}
  </Box>
);

export default Padding;
