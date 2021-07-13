// React + Redux + Functionality
import { useRouter } from 'next/router';

const CoordinatorCourseJustificationsPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  return (
    <div >
      {courseID}
      CoordinatorCourseJustificationsPage
    </div>
  );
};

export default CoordinatorCourseJustificationsPage;
