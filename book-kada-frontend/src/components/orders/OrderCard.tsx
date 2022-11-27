import {
  CardActionArea,
  Typography,
  CardMedia,
  ListItem,
  ListItemText,
  CardContent,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { Method, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookContext } from "../../store/Book_Context";
import LoadedComponent from "../../UI/LoadedComponent";
import showToast from "../../utils/Toastify";
import { BookDetails, RatingInterface } from "../book/DetailsCard";

export interface OrderDataProps {
  orderDate: Date;
  name: string;
  bookId: number;
  price: number;
  author: string;
  userId: number;
  description: string;
  rating: number;
  ratings: RatingInterface[];
}


export default function OrderCard() {
    const { makeApiCall, loadingFlag } = useApiService();
    const bookContext = useContext(BookContext)
    
  useEffect(() => {
    makeApiCall(Method.GET, "orders/userOrders/:userId")
      .then((response: OrderDataProps[]) => {
        bookContext?.setAllBooks(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));
    
  },[]);
  console.log(bookContext?.allBooks);
   return (
     <LoadedComponent loadingFlag={loadingFlag}>
       {bookContext?.allBooks.map(
         (element: BookDetails): JSX.Element => (
           <Card
             sx={{
               width: 1,
               display: "grid",
               gap: 1,
               height: 200,
               margin:2,
               gridTemplateColumns: "repeat(4, 1fr)",
             }}
           >
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="100%"
                 width="100%"
                 image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
                 alt="green iguana"
               />
             </CardActionArea>
             <Box gridColumn="span 2">
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   {element.name}
                 </Typography>
                 <Typography gutterBottom variant="subtitle1" component="div">
                   By {element.author}
                 </Typography>
                 <Typography gutterBottom variant="subtitle2" component="div">
                   ${element.price}
                 </Typography>
               </CardContent>
             </Box>
             <Box>
               <ListItem>
                 <ListItemText primary="Ordered On" secondary={"Jan 7, 2014"} />
               </ListItem>
               <Typography
                 sx={{ mt: 0.5, ml: 2 }}
                 color="text.secondary"
                 display="block"
                 variant="caption"
               ></Typography>
               <ListItem>
                 <ListItemText primary="Amount Payable" secondary="$232" />
               </ListItem>
             </Box>
           </Card>
         )
       )}
     </LoadedComponent>
   );
}
