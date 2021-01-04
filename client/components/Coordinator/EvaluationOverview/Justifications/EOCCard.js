// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Muted from "components/MaterialKit/Typography/Muted.js";
import Success from "components/MaterialKit/Typography/Success.js";
import Danger from "components/MaterialKit/Typography/Danger.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const EOCCard = ({ title, description, rating, justification, eocID }) => {
  const ratingMsg =
    rating != null ? (
      <Success>Your Rating: {rating}</Success>
    ) : (
      <Danger>Your Rating: None</Danger>
    );

  const justMsg =
    justification != null ? (
      <Success>Your Justification: {justification}</Success>
    ) : (
      <Danger>Your Justification: None</Danger>
    );

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={8}>
            <Muted>{description}</Muted>
          </GridItem>
          <GridItem xs={4}>
            <Button>
              <FindInPageIcon />
              View
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <GridContainer direction="column" alignItems="flex-start">
          <GridItem>{ratingMsg}</GridItem>
          <GridItem>{justMsg}</GridItem>
        </GridContainer>
      </CardFooter>
    </Card>
  );
};

export default EOCCard;
