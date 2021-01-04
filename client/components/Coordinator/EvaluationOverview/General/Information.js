import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
const Information = () => {
  return (
    <Card>
      <CardHeader color="success">Information</CardHeader>
      <CardBody>
        <h4>Review Target due Date:</h4>
        <p>xx/xx/xx</p>
        <h4>Review Description:</h4>
        <p>[Insert Review Description Here]</p>
      </CardBody>
    </Card>
  );
};

export default Information;
