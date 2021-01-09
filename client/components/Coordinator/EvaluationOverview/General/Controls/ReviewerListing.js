// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import DeleteIcon from "@material-ui/icons/Delete";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
import { cardTitle, cardSubtitle } from "assets/jss/nextjs-material-kit.js";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
  cardTitle,
  cardSubtitle,
  center: {
    textAlign: "center",
  },
});

const ReviewerListing = ({ email, name, inviter, status }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardBody>
        <GridContainer justify="space-evenly" alignItems="center">
          <GridItem xs={4}>
            <h3 className={classes.cardTitle}>{name}</h3>
            <h4 className={classes.cardSubtitle}>{email}</h4>
          </GridItem>

          <GridItem xs={4}>
            {/* <h5>
                  Inviter: <b>{inviter}</b>
                  </h5> */}
            <h5>
              Status: <b>{status}</b>
            </h5>
          </GridItem>
          <GridItem xs={4} className={classes.center}>
            <Button color="danger">
              <DeleteIcon />
              Delete
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default ReviewerListing;
