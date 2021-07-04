// Custom Components
import ReviewProgress from './ReviewProgress';
import OtherFunctions from './OtherFunctions';

// Material Kit
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

const Reviews = () => {
  return (
    <GridContainer>
      <GridItem xs={9}>
        <ReviewProgress />
      </GridItem>
      <GridItem xs={3}>
        <OtherFunctions />
      </GridItem>
    </GridContainer>
  );
};

export default Reviews;
