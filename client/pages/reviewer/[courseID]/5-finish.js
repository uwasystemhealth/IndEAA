// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// Utilities
import {useCurrentReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';

// Custom Components
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPagePreSubmissionContent from 'components/reviewer/ReviewerPagePreSubmissionContent';

const ReviewerCourseReviewPage5 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector(state => state.review);
  const authUser = useSelector((state) => state.auth.user);

  // Load the Reviewer using custom useEffect Hook
  useCurrentReviewOfUser(authUser,reviewState,courseID);

  const pageNumber = 5;
  return (
    <div >
      <ReviewerPageCardDescription
        pageNumber={pageNumber}
      />
      <ReviewerPagePreSubmissionContent isReadOnly />
    </div>
  );
};

export default ReviewerCourseReviewPage5;
