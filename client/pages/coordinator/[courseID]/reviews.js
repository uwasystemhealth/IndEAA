// React + Redux + Functionality
import { useRouter } from 'next/router';

const CoordinatorCourseReviewsPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  return (
    <div >
      {courseID}
            CoordinatorCourseReviewsPage
    </div>
  );
};

export default CoordinatorCourseReviewsPage;
