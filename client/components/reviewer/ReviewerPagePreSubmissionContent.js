// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// Custom Components
import ReviewerEOCListing from 'components/reviewer/ReviewerEOCListing';
import ReviewerGeneralComment from 'components/reviewer/ReviewerGeneralComment';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import Success from 'components/MaterialKit/Typography/Success.js';
import Danger from 'components/MaterialKit/Typography/Danger.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from 'assets/jss/nextjs-material-kit.js';
const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const ReviewerPagePreSubmissionContent = ({isReadOnly}) => {
  const router = useRouter();
  const { courseID } = router.query;
  const classes = useStyles();
  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);
  const courseState = useSelector((state) => state['course-evaluation']);
  const course = courseState.data;

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          1. Overview and EOCs
        </AccordionSummary>
        <AccordionDetails>
          {review && review.step1DevelopmentLevels ? (
            <Success>
              You have read and confirmed that you have understood the elements
              of competencies.
            </Success>
          ) : (
            <Danger>
              You have not yet read and confirmed that you have understood the
              elements of competencies.
            </Danger>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          2. Documents
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer
            alignItems="center"
            justify="center"
            style={{ width: '100%' }}
          >
            {course &&
              course.documents.map((document) => {
                // Filter the review documents with the currently
                // selected course document
                const reviewOfDocument = review?.step2Documents?.find(
                  (reviewDoc) =>
                    reviewDoc && reviewDoc.document_id === document._id
                );

                return (
                  <GridItem xs={4} key={document._id}>
                    <Card>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{document.name}</h4>
                        <p>{document.description}</p>
                        <h4>
                          <strong>Comment:</strong>
                          {reviewOfDocument && reviewOfDocument.comment ? (
                            <Success> {reviewOfDocument.comment}</Success>
                          ) : (
                            <Danger>
                              You have not provided any comments here
                            </Danger>
                          )}
                          <h4>
                            <strong>Date Finished:</strong>
                            {reviewOfDocument &&
                            reviewOfDocument.finishedReviewedOn ? (
                                <Success>
                                  {reviewOfDocument.finishedReviewedOn}
                                </Success>
                              ) : (
                                <Danger>
                                You have not marked this as review completed
                                </Danger>
                              )}
                          </h4>
                        </h4>
                      </CardBody>
                    </Card>
                  </GridItem>
                );
              })}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            3. Review Course
        </AccordionSummary>
        <AccordionDetails>
          <ReviewerEOCListing isReadOnly={isReadOnly}/>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            4. Review
        </AccordionSummary>
        <AccordionDetails>
          <ReviewerGeneralComment isReadOnly={isReadOnly} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReviewerPagePreSubmissionContent;
