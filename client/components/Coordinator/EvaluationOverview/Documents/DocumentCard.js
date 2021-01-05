import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";

const DocumentCard = ({ documentID, title, createdDate, uri, eocs }) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <p>Added on {createdDate}</p>
        <p>URI: {uri}</p>
      </CardBody>
      <CardFooter>{eocs}</CardFooter>
    </Card>
  );
};

export default DocumentCard;
