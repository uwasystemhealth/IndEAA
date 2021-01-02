// CUSTOM COMPONENTS
import CourseList from "../../components/Coordinator/CourseList/CourseList";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const CoordinatorMainPage = () => {
  const classes = useStyles();
  return (
    <div>
      <CourseList />
    </div>
  );
};

export default CoordinatorMainPage;
