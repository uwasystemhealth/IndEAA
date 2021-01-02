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
        coordinators: ["Melinda Hodkiewics"],
      },
      {
        courseid: "CITS2002",
        documents: [],
        reviewDescription: "Intro unit for beginner programmers",
        reviewTargetDate: "9/12/2020",
        isArchived: true,
        createdAt: "5/12/2020",
        createdBy: {},
        EOC: [],
        coordinators: ["Chris McDonald"],
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardBody>Loading...</CardBody>
      </Card>
    );
  }

  // 2. Render course list elements
  const evaluationListings = courseEvaluations.map(
    ({ courseid, reviewDescription, coordinators }) => {
      return (
        <EvaluationListing
          key={courseid}
          courseId={courseid}
          coordinators={coordinators}
          evaluationDescription={reviewDescription}
        />
      );
    }
  );

  return (
    <Card>
      <CardBody>{evaluationListings}</CardBody>
    </Card>
  );
};

export default EvaluationList;
