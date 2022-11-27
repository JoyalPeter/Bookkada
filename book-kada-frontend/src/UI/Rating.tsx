import { Rating } from "@mui/material";
import { Stack } from "@mui/material";

export interface IRatingsProps {
  defaultValue: number;
}
export default function Ratings({ defaultValue }: IRatingsProps) {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={defaultValue}
        precision={0.5}
        size="small"
        readOnly
      />
    </Stack>
  );
}
