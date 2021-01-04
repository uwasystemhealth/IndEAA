// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Muted from "components/MaterialKit/Typography/Muted.js";
import Success from "components/MaterialKit/Typography/Success.js";
import Danger from "components/MaterialKit/Typography/Danger.js";

const EOCCard = ({ title, description, rating, justification, eocID }) => {
  const ratingMsg =
    rating != null ? (
      <Success>Your Rating: {rating}</Success>
    ) : (
      <Danger>Your Rating: None</Danger>
    );

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Muted>{description}</Muted>
      </CardBody>
      <CardFooter>{ratingMsg}</CardFooter>
    </Card>
  );
};

export default EOCCard;
