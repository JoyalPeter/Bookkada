import {
  CardActionArea,
  Typography,
  CardMedia,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";

import { Box } from "@mui/system";
import RightBox from "../../UI/RightBox";
import CentreBox from "../../UI/CenterBox";
import EventIcon from "@mui/icons-material/Event";

export default function OrderCard() {
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
          <RightBox>
            <ListItem>
              <ListItemAvatar>
                  <EventIcon />
              </ListItemAvatar>
              <ListItemText  primary="Ordered On" secondary="Jan 9, 2014" />
            </ListItem>
          </RightBox>
        </Box>
      </Card>
    </div>
  );
}
