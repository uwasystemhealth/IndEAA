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

  // 2. Render course list elements

  return <div className={classes.listing}></div>;
};

export default EvaluationListing;
