// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

import { useState, useEffect } from "react";

const OtherInformation = ({ evaluationID }) => {
  useEffect(() => {
    services["course-evaluation"].get({
      _id: evaluationID,
    });
  }, []);

  const courseEval = useSelector((state) => state["course-evaluation"]);
  const evalData = courseEval?.data;

  const createdOn = new Date(evalData?.createdAt);
  const createdBy = evalData?.createdBy;
  const dateString = createdOn?.toLocaleDateString("en-gb", {
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
          {createdBy || "Unknown creator"} (on {dateString || "unknown date"})
        </p>
      </CardBody>
    </Card>
  );
};

export default OtherInformation;
