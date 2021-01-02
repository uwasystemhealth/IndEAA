// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";

// CUSTOM COMPONENTS
import EvaluationListing from "./EvaluationListing.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

import { useEffect, useState } from "react";

const EvaluationList = () => {
  const classes = useStyles();

  const [courseEvaluations, setCourseEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Find all CourseEvaluations where the createdBy key matches the logged in user

    setCourseEvaluations([
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
    ]);

    setLoading(false);
  }, []);

  // 2. Render course list elements
  if (loading) {
    return (
      <Card>
        <CardBody>Loading...</CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody></CardBody>
    </Card>
  );
};

export default EvaluationList;
