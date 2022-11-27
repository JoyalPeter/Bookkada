import Box from "@mui/material/Box";
import React from "react";

const RightBox: React.FC<any> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      p: 2,
      m: 5,
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);

export default RightBox;
