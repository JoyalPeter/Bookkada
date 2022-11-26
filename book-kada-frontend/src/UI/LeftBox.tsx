import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

type Props = {
  children: JSX.Element;
};

const LeftBox: React.FC<any> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      p: 1,
      m: 1,
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);

export default LeftBox;
