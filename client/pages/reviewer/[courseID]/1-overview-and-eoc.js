// React + Redux + Functionality
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom Components
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerDocumentsListing from 'components/reviewer/ReviewerDocumentsListing';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';

// Utilities
import {useCurrentReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';
import useRedirectIfFinish from 'components/customHooks/ReviewerFinishedGuard';
import { getEOCInfo } from 'utils/eocs';

// Material Kit
import CustomTabs from 'components/MaterialKit/CustomTabs/CustomTabs.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/loginPage.js';
const useStyles = makeStyles(styles);

const ReviewerCourseReviewPage1 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);


  // Load the Reviewer using custom useEffect Hook
  useCurrentReviewOfUser(authUser,reviewState,courseID);
  useRedirectIfFinish(review,courseID);

  const handleSubmit = () => {
    // Update the Review Process when has been read
    if (!review.step1DevelopmentLevels) {
      services.review.patch(review._id, {
        step1DevelopmentLevels: new Date(),
      });
    }
  };

  const pageNumber = 1;

  return (
    <div>
      <ReviewProgress review={review} />
      <ReviewerPageCardDescription
        pageNumber={pageNumber}
      />
      <ReviewerDocumentsListing specificTags={'introduction'} />
      <EOCDescriptionAccordions />
      <ReviewerPageBottomNavigation
        pageNumber={pageNumber}
        course_id={courseID}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const EOCDescriptionAccordions = () => {
  const [eocs] = useState(() => getEOCInfo());

  // This is a copy of the coordinator/EOCAccordion (modified)
  // This needs to be refactored later on
  // Ideally the aggreed upon

  const classes = useStyles();

  return (
    <>
      {eocs.map((eocSet) => (
        <Accordion key={eocSet.setNum}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            EOC {eocSet.setNum}: {eocSet.setName}
          </AccordionSummary>
          <AccordionDetails>
            <CustomTabs
              headerColor="primary"
              tabs={eocSet.EOCS.map((eoc) => ({
                tabName: `EOC ${eocSet.setNum}.${eoc.EOCNum}`,
                tabContent: (
                  <GridContainer>
                    <GridItem md={6}>
                      <h4 className={classes.title}>Description</h4>
                      <p>{eoc.desc}</p>
                    </GridItem>
                    <GridItem md={6}>
                      <h4 className={classes.title}>Indicators Of Attainment</h4>
                      {eoc.indicatorsOfAttainment.map(indicator=> <p key={indicator}>{indicator}</p>)}
                    </GridItem>
                  </GridContainer>
                ),
              }))}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default ReviewerCourseReviewPage1;
