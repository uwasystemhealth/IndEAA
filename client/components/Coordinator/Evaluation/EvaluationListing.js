// CORE
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import Grid from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import Link from "@material-ui/core/Link";

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
  root: {
    width: "inherit",
  },
}));

const EvaluationListing = ({
  evalId,
  courseCode,
  coordinators,
  evaluationDescription,
}) => {
  const classes = useStyles();

  const coordinatorNames = coordinators.join(", ");

  return (
    <Grid className={classes.root}>
      <GridItem xs={9}>
        <h2>{courseCode}</h2>
        <h3>{coordinatorNames}.</h3>
        <p>{evaluationDescription}</p>
      </GridItem>
      <GridItem xs={3} className={classes.buttons}>
        <Button color="primary" type="button" startIcon={<PictureAsPdfIcon />}>
          Export
        </Button>
        <Link href={`/coordinator/${evalId}`}>
          <Button color="primary" type="button" startIcon={<HowToVoteIcon />}>
            Reviews
          </Button>
        </Link>
      </GridItem>
    </Grid>
  );
};

export default EvaluationListing;
