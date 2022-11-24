import { Rating } from "@mui/material";
import { Stack } from "@mui/material";

export default function Ratings() {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={2.5}
        precision={0.5}
        size="small"
        readOnly
      />
    </Stack>
  );
}
