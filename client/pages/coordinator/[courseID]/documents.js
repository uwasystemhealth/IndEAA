// React + Redux + Functionality
import { useRouter } from 'next/router';

const CoordinatorCourseDocumentsPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  return (
    <div >
      {courseID}
      CoordinatorCourseDocumentsPage
    </div>
  );
};

export default CoordinatorCourseDocumentsPage;
