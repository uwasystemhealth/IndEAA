// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// Custom Components
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerDocumentsListing from 'components/reviewer/ReviewerDocumentsListing';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';

// Utilities
import { useCurrentReviewOfUser } from 'components/customHooks/ReviewerReviewLoad';
import useRedirectIfFinish from 'components/customHooks/ReviewerFinishedGuard';

const ReviewerCourseReviewPage2 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);

  // Load the Reviewer using custom useEffect Hook
  useCurrentReviewOfUser(authUser,reviewState,courseID);
  useRedirectIfFinish(review,courseID);
  const pageNumber = 2;

  return (
    <div>
      <ReviewProgress review={review} />
      <ReviewerPageCardDescription pageNumber={pageNumber} />
      <ReviewerDocumentsListing />
      <ReviewerPageBottomNavigation
        pageNumber={pageNumber}
        course_id={courseID}
      />
    </div>
  );
};

export default ReviewerCourseReviewPage2;
