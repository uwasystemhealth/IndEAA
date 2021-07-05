// React + Redux + Functionality
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom Components
import AreYouSureButton from 'components/Other/AreYouSureButton';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import Badge from 'components/MaterialKit/Badge/Badge.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Material UI
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from 'assets/jss/nextjs-material-kit.js';
const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const DocumentCard = ({
  document,
  course_id,
  setCurrentSelectedDocument,
  setCurrentSelectedDocumentReview, // contains both document and review details (for reviewer)
  isReviewer,
  isReadOnly,
}) => {
  const { _id, name, description, link, tags } = document;
  const classes = useStyles();

  //   const dateString = createdDate?.toLocaleDateString("en-gb", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });

  // Only for Coordinators
  const handleDelete = () => {
    services['course-evaluation'].patch(course_id, {
      $pull: { documents: { _id: document._id } },
    });
  };

  // Only for reviewers
  const reviewState = useSelector((state) => state.review);
  const review = reviewState?.queryResult.data[0];

  const getReviewDocumentObject = (documentId) =>
    review?.step2Documents.find(
      (currentDocument) => currentDocument.document_id === documentId
    );

  const currentDocumentReview = getReviewDocumentObject(document._id);

  const handleMarkAsViewed = () => {
    // If the document has already been reviewed, then mark it as null (to unmark)
    const dateReviewed = currentDocumentReview?.finishedReviewedOn
      ? null
      : new Date();
    if (currentDocumentReview) {
      // Document exist - update current document record
      services.review.patch(
        review._id,
        {
          'step2Documents.$': {
            ...currentDocumentReview,
            finishedReviewedOn: dateReviewed,
          },
        },
        { query: { 'step2Documents.document_id': document._id } }
      );
    } else {
      // Document Does not exist yet - Push new document record
      services.review.patch(
        review._id,
        {
          $push : {step2Documents: {
            document_id: document._id,
            finishedReviewedOn: dateReviewed,
          }},
        }
      );
    }
  };

  const badges = tags.map(tag=>{
    const isEOC = Boolean(parseFloat(tag)); // Non-floating point are false
    const color = isEOC ? 
      tag.includes('.') ? 'info' : 'primary' :
      'rose';

    return(
      <Badge key={tag} color={color}>
        {isEOC ? <>EOC: {tag}</> : tag}
      </Badge>
    );
  });

  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem md={8}>
            <h4 className={classes.cardTitle}>{name}</h4>
            <p>{description}</p>
            {badges}
          </GridItem>
          <GridItem md={3}>
            <GridContainer direction="column">
              <Button color="white" onClick={() => window.open(link)}>
                <PageviewIcon />
                View
              </Button>
              {!isReadOnly &&
                                <>{isReviewer ? (
                                  <>
                                    {currentDocumentReview?.finishedReviewedOn ? (
                                      <Button
                                        color="primary"
                                        onClick={() => handleMarkAsViewed()}
                                      >
                                        <EditIcon />
                          Mark as unread
                                      </Button>
                                    ) : (
                                      <Button
                                        color="white"
                                        onClick={() => handleMarkAsViewed()}
                                      >
                                        <EditIcon />
                          Mark as Viewed
                                      </Button>
                                    )}
                                    {currentDocumentReview?.comment ? (
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          setCurrentSelectedDocumentReview({
                                            document,
                                            reviewComment: currentDocumentReview,
                                          })
                                        }
                                      >
                                        <EditIcon />
                          Edit Comment
                                      </Button>
                                    ) : (
                                      <Button
                                        color="white"
                                        onClick={() =>
                                          setCurrentSelectedDocumentReview({
                                            document,
                                            reviewComment: currentDocumentReview,
                                          })
                                        }
                                      >
                                        <EditIcon />
                          Add Comment
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      color="white"
                                      onClick={() => setCurrentSelectedDocument(document)}
                                    >
                                      <EditIcon />
                        Edit
                                    </Button>
                                    <AreYouSureButton
                                      buttonProps={{ color: 'white' }}
                                      action={handleDelete}
                                    >
                                      <DeleteIcon />
                        Delete
                                    </AreYouSureButton>
                                  </>
                                )}</>
              }
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default DocumentCard;
