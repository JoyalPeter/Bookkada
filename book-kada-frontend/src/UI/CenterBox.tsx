import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

type Props = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

const CentreBox: React.FC<Props> = ({ children, sx }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
      borderRadius: 10,
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default CentreBox;
