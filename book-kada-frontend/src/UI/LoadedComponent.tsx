import React, { useEffect } from "react";
import Spinner from "./Spinner";

export interface ILoadedComponentProps {
  loadingFlag: boolean;
  children: React.ReactNode;
}

export default function LoadedComponent({
  children,
  loadingFlag,
}: ILoadedComponentProps) {
  return (
    <>
      {loadingFlag && <Spinner />}
      {!loadingFlag && children}
    </>
  );
}
