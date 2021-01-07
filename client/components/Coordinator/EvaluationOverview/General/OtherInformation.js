import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
const OtherInformation = ({ createdBy, createdOn }) => {
  const dateString = createdOn.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader color="success">Other Information</CardHeader>
      <CardBody>
        <h4>Created by:</h4>
        <p>
          {createdBy} (on {dateString})
        </p>
      </CardBody>
    </Card>
  );
};

export default OtherInformation;
