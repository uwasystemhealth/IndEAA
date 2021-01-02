// CORE
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import Grid from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

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
    width: "5rem",
    height: "5rem",
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
        <PictureAsPdfIcon className={classes.button} />
        <HowToVoteIcon className={classes.button} />
      </GridItem>
    </Grid>
  );
};

export default EvaluationListing;
