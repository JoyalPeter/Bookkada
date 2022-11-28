import { Button } from "@mui/material";
import React from "react";
export interface IButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  endIcon?: JSX.Element;
}

export default function ({ children, onClick, endIcon }: IButtonProps) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
}
