import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import ManageReviewers from "./ManageReviewers.js";

import { useState } from "react";

const Controls = ({ evaluationID }) => {
  return (
    <Card>
      <CardBody>
        <Button color="warning">Archive</Button>
        <Button color="warning">Force Completion</Button>
        <ManageReviewers evaluationID={evaluationID} />
      </CardBody>
    </Card>
  );
};

export default Controls;
