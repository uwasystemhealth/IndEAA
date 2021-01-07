// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import PageviewIcon from "@material-ui/icons/Pageview";

// CUSTOM COMPONENTS
import Stepper from "./Stepper.js";

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
        <GridContainer>
          <GridItem xs={4}>
            <h4 className={classes.cardTitle}>{name}</h4>
            <h5 className={classes.cardSubtitle}>{email}</h5>
            <Button display="inline-block" color="white">
              <PageviewIcon />
              View
            </Button>
            <Button display="inline-block" color="white">
              <PageviewIcon />
              Reopen
            </Button>
          </GridItem>
          <GridItem xs={8}>
            <Stepper step={stage} />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default ProgressDisplay;
