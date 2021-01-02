//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles({
  ...styles,
  listing: `
display: grid;
                              `,
});

const EvaluationListing = ({
  courseId,
  coordinators,
  evaluationDescription,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <h2>{courseId}</h2>
      <br />
      <h3>{coordinators}</h3>
      <br />
      <p>{evaluationDescription}</p>
    </div>
  );
};

export default EvaluationListing;
