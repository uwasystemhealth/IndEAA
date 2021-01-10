// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { spacing } from "@material-ui/system";

// CUSTOM COMPONENTS
import EvaluationListing from "./EvaluationListing.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
import checkboxStyles from "assets/jss/nextjs-material-kit/customCheckboxRadioSwitch.js";
const useStyles = makeStyles(() => ({
  ...styles,
  ...checkboxStyles,
  footer: {
    flexDirection: "row-reverse",
  },
  checkbox: {
    marginLeft: "1rem",
  },
}));

import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

const EvaluationList = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // 1. Find all CourseEvaluations where the createdBy key matches the logged in user
    services["course-evaluation"].find();
    // TODO: Find all the coordinators assigned to these evaluations.
    setLoading(false);
  }, []);

  const courseEvaluations = useSelector((state) => state["course-evaluation"])
    .queryResult.data;

  if (loading) {
    return (
      <Card>
        <CardBody>Loading...</CardBody>
      </Card>
    );
  }

  let evaluationListings = courseEvaluations;
  // 2. Filter out archived courses
  if (!showArchived) {
    evaluationListings = courseEvaluations.filter((val) => !val.isArchived);
  }

  // 3. Render course list elements
  evaluationListings = evaluationListings.map(
    ({ _id, courseId, reviewDescription, coordinators }) => {
      return (
        <ListItem key={_id} divider>
          <EvaluationListing
            evalId={_id}
            courseCode={courseId}
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
        <GridContainer>
          <GridItem xs={9}>
            <h2>Manage Course Evaluations</h2>
          </GridItem>
          <GridItem xs={2}>
            <Card ml={10}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      className={classes.checkbox}
                      checked={showArchived}
                      onChange={(e) => {
                        setShowArchived(e.target.checked);
                      }}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Show Archived"
                />
              </FormGroup>
            </Card>
          </GridItem>
        </GridContainer>
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
