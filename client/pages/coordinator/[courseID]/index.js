// React + Redux + Functionality
import { useRouter } from 'next/router';

// Custom Components
import GeneralPage from 'components/Coordinator/EvaluationOverview/GeneralPage.js';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);

const CoordinatorCourseMainPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const classes = useStyles();
  return <GeneralPage courseID={courseID} />;
};

export default CoordinatorCourseMainPage;
