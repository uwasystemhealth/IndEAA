// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Muted from "components/MaterialKit/Typography/Muted.js";

const EOCCard = ({ title, description, rating, justification, eocID }) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Muted>{description}</Muted>
      </CardBody>
    </Card>
  );
};

export default EOCCard;
