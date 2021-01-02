// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const CourseList = () => {
  const classes = useStyles();

  // 1. Load courses from database
  // 2. Render course list elements

  return (
    <Card>
      <CardBody></CardBody>
    </Card>
  );
};

export default CourseList;
