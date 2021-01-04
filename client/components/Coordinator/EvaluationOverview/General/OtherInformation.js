import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
const OtherInformation = () => {
  return (
    <Card>
      <CardHeader color="success">Other Information</CardHeader>
      <CardBody>
        <h4>Created by:</h4>
        <p>Frinze Erin Lapuz (on xx/xx/xx)</p>
      </CardBody>
    </Card>
  );
};

export default OtherInformation;
