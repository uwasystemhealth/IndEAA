// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const CourseList = () => {
  const classes = useStyles();

  // 1. Find all CourseEvaluations where the createdBy key matches the logged in user
  const CourseEvaluations = [
    {
      courseid: "MECH5521/MECH5522",
      documents: [],
      reviewDescription:
        "This is a capstone unit for engineering students where they make something cool",
      reviewTargetDate: "10/10/2021",
      isArchived: false,
      createdAt: "1/1/2021",
      createdBy: {},
      EOC: [],
    },
  ];

  // 2. Render course list elements

  return (
    <Card>
      <CardBody></CardBody>
    </Card>
  );
};

export default CourseList;
