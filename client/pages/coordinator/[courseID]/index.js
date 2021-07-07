// React + Redux + Functionality
import { useRouter } from 'next/router';

// Custom Components
import GeneralPage from 'components/Coordinator/EvaluationOverview/GeneralPage.js';

const CoordinatorCourseMainPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  return <GeneralPage courseID={courseID} />;
};

export default CoordinatorCourseMainPage;
