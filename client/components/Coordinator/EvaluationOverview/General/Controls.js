import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

const Controls = () => {
  return (
    <Card>
      <CardBody>
        <Button color="warning">Archive</Button>
        <Button color="warning">Force Completion</Button>
        <Button color="info">Manage Coordinators</Button>
      </CardBody>
    </Card>
  );
};

export default Controls;
