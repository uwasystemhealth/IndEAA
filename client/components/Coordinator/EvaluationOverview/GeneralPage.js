// Styles
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const GeneralPage = ({ courseID }) => {
  const classes = useStyles();
  return (
    <div>
      {courseID}
      Coordinator Course Main Page
    </div>
  );
};

export default GeneralPage;
