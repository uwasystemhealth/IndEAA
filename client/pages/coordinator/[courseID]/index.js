// CORE COMPONENTS
import GeneralPage from "components/Coordinator/EvaluationOverview/GeneralPage.js";
import { useRouter } from "next/router";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const CoordinatorCourseMainPage = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const classes = useStyles();
  return <GeneralPage courseID={courseID} />;
};

export default CoordinatorCourseMainPage;
