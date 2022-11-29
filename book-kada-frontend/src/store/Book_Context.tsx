import React, { useState, createContext } from "react";
import { BookDetails } from "../components/book/DetailsCard";
import { ReviewDetails } from "../components/book/ViewReview";

export interface IBookContext {
  reviews: ReviewDetails[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewDetails[]>>;
  bookDetails: BookDetails | null;
  setBookDetails: React.Dispatch<React.SetStateAction<BookDetails | null>>;
  allBooks: BookDetails[];
  setAllBooks: React.Dispatch<React.SetStateAction<BookDetails[]>>;
}

export interface IViewResponseContextProviderProps {
  children?: React.ReactNode;
}

export const BookContext = createContext<IBookContext | undefined>(undefined);

export default function ViewResponseProvider({ children }: IViewResponseContextProviderProps) {
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  const [reviews, setReviews] = useState([] as ReviewDetails[]);

  const [allBooks, setAllBooks] = useState([] as BookDetails[]);

  return (
    <BookContext.Provider
      value={{
        bookDetails,
        setBookDetails,
        reviews,
        setReviews,
        allBooks,
        setAllBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
