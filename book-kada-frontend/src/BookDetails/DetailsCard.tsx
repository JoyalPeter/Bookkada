import { FC, useState } from "react";


import CentreBox from "../UI/CenterBox";
import Padding from "../UI/Padding";
import ViewReview from "../BookDetails/ViewReview";
import DetailsSubCard from './DetailsSubCard'

interface DetailsProps {}

const DetailsCard: FC<DetailsProps> = ({}) => {

  return (
    <>
    <Padding>
      <DetailsSubCard/>
      <CentreBox>
      <h1>Reviews</h1>
      </CentreBox>
      <ViewReview />
    </Padding>
    </>
  );
};

export default DetailsCard;
