
import React, {useEffect,useState} from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Button, Typography } from "@mui/material";
import CentreBox from "../UI/CenterBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LeftBox from "../UI/LeftBox";
import showToast from "../utils/Toastify";
import { Method, Toast } from "../constants/enums";
import { useNavigate } from "react-router-dom";
import useApiService from "../hooks/UseApiService";
import Spinner from "../UI/Spinner";


export interface BookDetails {
  name:string
  price:string
  description:string
  author:string
}

export default function DetailsSubCard () {
  const [resp,setResponse]=useState([] as BookDetails[])
  const { makeApiCall, loadingFlag} = useApiService()


  useEffect(()=>{
        makeApiCall(Method.GET, "books/getBook/2").then((response : BookDetails[])=>{
           console.log("jshhsh",response)

           setResponse(response);
          }).catch((error)=> (error)) 
  },[]);
  console.log(loadingFlag)
  return (
    <div>
      {loadingFlag?(<Spinner/>):(
        resp.map((item:BookDetails):JSX.Element=>(
      <Card 
        sx={{
          width: 1,
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
            alt="green iguana"
          />
        </CardActionArea>

        <CardContent>
          <LeftBox>
            <Typography gutterBottom variant="h5" component="div">
              Rating :{" "}
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </Typography>
          </LeftBox>
          <Typography gutterBottom variant="h3" component="div">
            {/* {resp[0] && resp[0].name} */}
            {item.name}   
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {/* {resp[0] && resp[0].name} */}
            {item.author}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {/* {resp[0] && resp[0].name} */}
            ${item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {resp[0] && resp[0].description} */}
            {item.description}
          </Typography>

          <CentreBox>
            <Box sx={{ display: "flex", gap: 5 }}>
            
              <Button
                variant="contained"
                
                endIcon={<AddShoppingCartIcon />}
              >
                Add To Cart
              </Button>
            </Box>
          </CentreBox>
        </CardContent>
      </Card>)))
}
    </div>

  );
}
