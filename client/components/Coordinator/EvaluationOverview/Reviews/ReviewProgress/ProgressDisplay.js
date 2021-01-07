// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle, cardSubtitle } from "assets/jss/nextjs-material-kit.js";
const styles = {
  cardTitle,
  cardSubtitle,
};
const useStyles = makeStyles(styles);

const ProgressDisplay = ({ name, email, stage, reviewID }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardBody>
        <h4 className={classes.cardTitle}>{name}</h4>
        <h5 className={classes.cardSubtitle}>{email}</h5>
      </CardBody>
    </Card>
  );
};

export default ProgressDisplay;
