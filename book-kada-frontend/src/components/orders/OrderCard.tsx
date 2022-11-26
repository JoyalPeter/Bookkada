import * as React from "react";
import {
  CardActionArea,
  Typography,
  Theme,
  SxProps,
  CardMedia,
  Grid,
} from "@mui/material";
import Card from "@mui/material/Card";

import { Box } from "@mui/system";
import RightBox from "../../UI/RightBox";
import CentreBox from "../../UI/CenterBox";

export interface IAppProps {
  sx?: SxProps<Theme>;
}

export default function OrderCard({ sx }: IAppProps) {
  return (
    <div>
      <Card
        sx={{
          width: 1,
          display: "grid",
          gap: 1,
          height: 200,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <Box>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
              alt="green iguana"
            />
          </CardActionArea>
        </Box>
        <Box gridColumn="span 2">
          <CentreBox>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CentreBox>
        </Box>
        <Box>
          <Typography>
            <RightBox>Cost</RightBox>
          </Typography>
        </Box>
      </Card>
    </div>
  );
}
