import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import ManageReviewers from "./ManageReviewers.js";

import { useState } from "react";
import { useRouter } from "next/router";

// Store actions and Redux
import { services } from "store/feathersClient";

const setArchived = (evaluation_id, router) => {
  services["course-evaluation"].patch(evaluation_id, {
    isArchived: true,
  });
  router.push("/coordinator");
};

const Controls = ({ evaluationID }) => {
  const router = useRouter();

  return (
    <Card>
      <CardBody>
        <Button
          color="warning"
          onClick={() => setArchived(evaluationID, router)}
        >
          Archive
        </Button>
        <Button color="warning">Force Completion</Button>
        <ManageReviewers evaluationID={evaluationID} />
      </CardBody>
    </Card>
  );
};

export default Controls;
