import * as React from 'react';
import { CardActionArea,Typography, Theme, SxProps, CardMedia, Grid } from "@mui/material";
import Card from "@mui/material/Card";

import { Box } from '@mui/system';

export interface IAppProps {
  sx?:SxProps<Theme>,
 

  
}

export default function CartCard ({sx}: IAppProps) {
  return (
    <div>
      <Card sx={{
          width: 1,
          display: "grid",
          gap: 1,
          height:200,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          <Box>
          <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
            alt="green iguana"
          />
        </CardActionArea>
        </Box>
        <Box gridColumn="span 2">
          <Typography variant="body2" color="text.secondary" >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          </Box>
        <Box>
          <Typography>
              Cost
          </Typography>
        </Box>
      </Card>
    </div>
  );
}