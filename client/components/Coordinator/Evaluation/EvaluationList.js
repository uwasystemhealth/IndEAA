// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

// CUSTOM COMPONENTS
import EvaluationListing from "./EvaluationListing.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(() => ({
  ...styles,
  footer: {
    flexDirection: "row-reverse",
  },
}));

import { useEffect, useState } from "react";

const EvaluationList = () => {
  const classes = useStyles();

  const [courseEvaluations, setCourseEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Find all CourseEvaluations where the createdBy key matches the logged in user

    setCourseEvaluations([
      {
        _id: "1231",
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
        _id: "4343",
        courseid: "CITS2002",
        documents: [],
        reviewDescription: "Intro unit for beginner programmers",
        reviewTargetDate: "9/12/2020",
        isArchived: true,
        createdAt: "5/12/2020",
        createdBy: {},
        EOC: [],
        coordinators: ["Chris McDonald", "Melinda Hodkiewics"],
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
    ({ _id, courseid, reviewDescription, coordinators }) => {
      return (
        <ListItem key={_id} divider>
          <EvaluationListing
            evalId={_id}
            courseCode={courseid}
            coordinators={coordinators}
            evaluationDescription={reviewDescription}
          />
        </ListItem>
      );
    }
  );

  return (
    <Card>
      <CardHeader color="success">
        <h2>Manage Course Evaluations</h2>
      </CardHeader>
      <CardBody>
        <List className={classes.list}>{evaluationListings}</List>
      </CardBody>
      <CardFooter className={classes.footer}>
        <Button color="secondary">Create New Evaluation</Button>
      </CardFooter>
    </Card>
  );
};

export default EvaluationList;
