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
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// CUSTOM COMPONENTS
import ReviewListing from "./ReviewListing";

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
  const theme = useTheme();
  const isBiggerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    // 1. Find all CourseEvaluations where the createdBy key matches the logged in user
    services["course-evaluation"].find();
  }, []);

  // Executes on Component Remount (after auth user is fetched)
  useEffect(() => {
    if (authUser) {
      // Only Call when authUser is now defined
      services.review.find({
        query: {
          user_id: authUser._id,
        },
      });
      setLoading(false);
    }
  }, [authUser]);

  const courseEvaluations = useSelector((state) => state["course-evaluation"])
    .queryResult.data;
  const reviews = useSelector((state) => state.review.queryResult.data);

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
          <ReviewListing
            evalId={_id}
            review={reviews.find((review) => review.course_id === _id) || {course_id:_id}}
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
      <CardHeader
        color="primary"
        style={{ width: isBiggerThanMd ? "50%" : "100%" }}
      >
        <GridContainer alignItems="center" justify="center">
          <GridItem md={9}>
            <h3 className={classes.cardTitle}>Review Courses</h3>
          </GridItem>
          <GridItem md={3}>
            {showArchived ? (
              <Button color="primary" onClick={() => setShowArchived(false)}>
                Hide Archived
              </Button>
            ) : (
              <Button color="rose" onClick={() => setShowArchived(true)}>
                Show Archived
              </Button>
            )}
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody>
        <List className={classes.list}>{evaluationListings}</List>
      </CardBody>
    </Card>
  );
};

export default EvaluationList;
