// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
import { cardTitle, cardSubtitle } from "assets/jss/nextjs-material-kit.js";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
  cardTitle,
  cardSubtitle,
});

const ReviewerListing = () => {
  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={4}>
            <h3 className={classes.cardTitle}>Michael Nefiodovas</h3>
            <h4 className={classes.cardSubtitle}>
              michael.nefiodovas@uwa.edu.au
            </h4>
          </GridItem>

          <GridItem xs={4}>
            <h5>
              Inviter: <b>You</b>
            </h5>
            <h5>
              Status: <b>Invite Pending</b>
            </h5>
          </GridItem>
          <GridItem xs={4}>
            <Button color="danger">Delete</Button>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default ReviewerListing;
