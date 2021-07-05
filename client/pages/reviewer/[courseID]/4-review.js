// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Utilities
import { useCurrentReviewOfUser } from 'components/customHooks/ReviewerReviewLoad';
import useRedirectIfFinish from 'components/customHooks/ReviewerFinishedGuard';
import { reviewSteps } from 'utils/review';

// Custom Components
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerPagePreSubmissionContent from 'components/reviewer/ReviewerPagePreSubmissionContent';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';
import AreYouSureButton from 'components/Other/AreYouSureButton';

const ReviewerCourseReviewPage4 = () => {
  const router = useRouter();
  const { courseID } = router.query;


  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  // Uses query result

  const authUser = useSelector((state) => state.auth.user);

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

  return (
    <div>
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
    </div>
  );
};

export default ReviewerCourseReviewPage4;
