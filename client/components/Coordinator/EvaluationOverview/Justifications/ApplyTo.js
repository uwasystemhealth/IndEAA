import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

const ApplyTo = ({ eocs }) => {
  return (
    <Card>
      <CardHeader color="success">Appy to</CardHeader>
      <CardBody>EOC 1.1, EOC 1.2, etc</CardBody>
    </Card>
  );
};

export default ApplyTo;
