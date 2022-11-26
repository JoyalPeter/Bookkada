import React, { useState, createContext } from "react";
import { BookDetails } from "../components/book/DetailsCard";
import { ReviewDetails } from "../components/book/ViewReview";
import { BookDataProps } from "../components/Home/HomeComponent";

export interface IBookContext {
  reviews: ReviewDetails[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewDetails[]>>;
  bookDetails: BookDetails | null;
  setBookDetails: React.Dispatch<React.SetStateAction<BookDetails | null>>;
  allBooks: BookDataProps[];
  setAllBooks: React.Dispatch<React.SetStateAction<BookDataProps[]>>;
}

export interface IBookContextProviderProps {
  children?: React.ReactNode;
}
export const BookContext = createContext<IBookContext | undefined>(undefined);

export default function ViewResponseProvider({
  children,
}: IBookContextProviderProps) {

  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  const [reviews, setReviews] = useState([] as ReviewDetails[]);

  const [allBooks, setAllBooks] = useState([] as BookDataProps[]);

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
