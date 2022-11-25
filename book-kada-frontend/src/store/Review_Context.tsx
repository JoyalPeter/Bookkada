import React, { useState, createContext } from "react";
import { ReviewDetails } from "../components/book/ViewReview";

export interface IViewResponseContext {
  viewResponse: ReviewDetails[];
  setViewResponse: React.Dispatch<React.SetStateAction<ReviewDetails[]>>;
}

export interface IReviewContextProviderProps {
  children?: React.ReactNode;
}
export const ViewResponseContext = createContext<
  IViewResponseContext | undefined
>(undefined);

export default function ViewResponseProvider({
  children,
}: IReviewContextProviderProps) {
  const [viewResponse, setViewResponse] = useState([] as ReviewDetails[]);
  return (
    <ViewResponseContext.Provider value={{ viewResponse, setViewResponse }}>
      {children}
    </ViewResponseContext.Provider>
  );
}
