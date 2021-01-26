import { useRouter } from 'next/router';

// Custom Hooks
import {useCurrentReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';
import useRedirectIfFinish from 'components/customHooks/ReviewerFinishedGuard';
// Use own components
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerPagePreSubmissionContent from 'components/reviewer/ReviewerPagePreSubmissionContent';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';
import AreYouSureButton from 'components/Other/AreYouSureButton';

// MaterialKit


import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Utils
import { reviewSteps } from 'utils/review';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);


const ReviewerCourseReviewPage4 = () => {
    const router = useRouter();
    const { courseID } = router.query;


    const reviewState = useSelector((state) => state.review);
    const review = reviewState.queryResult.data[0] || { course_id: courseID };
    // Uses query result

    const authUser = useSelector((state) => state.auth.user);
    const courseState = useSelector((state) => state['course-evaluation']);
    const course = courseState.data;

    // Load the Reviewer using custom useEffect Hook
    useCurrentReviewOfUser(authUser,reviewState,courseID);
    useRedirectIfFinish(review,courseID);
    
    const pageNumber = 4;
    const handleSubmit = () => {
    // Do validation to check the previous filled things or find in the page for any danger
        services.review.patch(review._id, {
            submittedDate: new Date(),
        });
        router.push(
            `/reviewer/${courseID}/${pageNumber + 1}-${
                reviewSteps[pageNumber].stepLink
            }`
        );
    };

    const classes = useStyles();
    return (
        <div>
            {reviewState.isFinished && courseState.isFinished ? (
                <>
                    <ReviewProgress review={review} />
                    <ReviewerPageCardDescription
                        pageNumber={pageNumber}
                    />
                    <ReviewerPagePreSubmissionContent />
                    <ReviewerPageBottomNavigation
                        pageNumber={pageNumber}
                        course_id={courseID}
                        overwriteNextButton={
                            <AreYouSureButton
                                buttonProps={{}}
                                description={
                                    'You are about to submit a review. Upon submission of a review, you will lose the ability to edit your review. If you have to edit a review, you will have to contact the coordinator of this unit.'
                                }
                                action={handleSubmit}
                            >
                Submit
                            </AreYouSureButton>
                        }
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ReviewerCourseReviewPage4;
