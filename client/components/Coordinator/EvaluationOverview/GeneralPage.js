// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

// Styles
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const GeneralPage = ({ courseID }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

export default GeneralPage;
