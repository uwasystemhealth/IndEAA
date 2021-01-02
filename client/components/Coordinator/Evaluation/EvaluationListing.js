// CORE
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import Grid from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(() => ({
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: "10em",
    height: "10em",
  },
}));

const EvaluationListing = ({
  courseId,
  coordinators,
  evaluationDescription,
}) => {
  const classes = useStyles();

  return (
    <Grid>
      <GridItem xs={9}>
        <h2>{courseId}</h2>
        <h3>{coordinators}</h3>
        <p>{evaluationDescription}</p>
      </GridItem>
      <GridItem xs={3} className={classes.buttons}>
        <Button color="primary" type="button">
          <PictureAsPdfIcon className={classes.button} />
          <p>Export</p>
        </Button>
        <Button color="primary" type="button">
          <HowToVoteIcon className={classes.button} />
          <p>Reviews</p>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default EvaluationListing;
