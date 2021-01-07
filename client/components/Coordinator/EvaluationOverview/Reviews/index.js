// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import ReviewProgress from "./ReviewProgress";
import OtherFunctions from "./OtherFunctions";

const Reviews = () => {
  return (
    <GridContainer>
      <GridItem xs={7}>
        <ReviewProgress />
      </GridItem>
      <GridItem xs={5}>
        <OtherFunctions />
      </GridItem>
    </GridContainer>
  );
};

export default Reviews;
