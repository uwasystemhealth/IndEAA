// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardFooter from 'components/MaterialKit/Card/CardFooter.js';
import Badge from 'components/MaterialKit/Badge/Badge.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// CUSTOM COMPONENTS
import AreYouSureButton from 'components/Other/AreYouSureButton';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import {
    cardTitle,
    cardLink,
    cardSubtitle,
} from 'assets/jss/nextjs-material-kit.js';

// Store Actions and Redux
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';
import { addNotificationMessage } from 'actions/general';

const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const DocumentCard = ({
    document,
    course_id,
    review_id,
    setCurrentSelectedDocument,
    setCurrentSelectedDocumentReview, // contains both document and review details (for reviewer)
    isReviewer,
}) => {
    const { _id, name, description, link, tags } = document;
    const classes = useStyles();
    const dispatch = useDispatch();

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

    const handleMarkAsViewed = (documentId) => {
        if (currentDocumentReview) {
            // Document exist

            // If the document has already been reviewed, then mark it as null (to unmark)
            const dateReviewed = currentDocumentReview.finishedReviewedOn
                ? null
                : new Date();

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
            // Document Does not exist yet
            dispatch(
                addNotificationMessage({
                    message:
            'Marking as finished reviews has failed due to no comments on documents.',
                })
            );
        }
    };

    const badges = tags.map((eoc) => (
        <Badge key={eoc} color={eoc.includes('.') ? 'info' : 'primary'}>
      EOC: {eoc}
        </Badge>
    ));

    return (
        <Card>
            <CardBody>
                <GridContainer>
                    <GridItem xs={8}>
                        <h4 className={classes.cardTitle}>{name}</h4>
                        <p>{description}</p>
                        <p>
              URI:{' '}
                            <a href={link} className={cardLink}>
                                {link}
                            </a>
                        </p>
                    </GridItem>
                    <GridItem xs={3}>
                        <GridContainer direction="column">
                            <Button color="white" onClick={() => window.open(link)}>
                                <PageviewIcon />
                View
                            </Button>

                            {isReviewer ? (
                                <>
                                    {currentDocumentReview?.finishedReviewedOn ? (
                                        <Button
                                            color="primary"
                                            onClick={() => handleMarkAsViewed(document._id)}
                                        >
                                            <EditIcon />
                      Mark as unread
                                        </Button>
                                    ) : (
                                        <Button
                                            color="white"
                                            onClick={() => handleMarkAsViewed(document._id)}
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
                            )}
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>{badges}</CardFooter>
        </Card>
    );
};

export default DocumentCard;
