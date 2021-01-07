// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

// STYLES
import { cardSubtitle } from "assets/jss/nextjs-material-kit.js";
import { makeStyles } from "@material-ui/core/styles";
const styles = {
  cardSubtitle,
};
const useStyles = makeStyles(styles);

import { useState, useEffect } from "react";

const Information = ({ reviewID, dueDate, description }) => {
  const classes = useStyles();

  const dateString = dueDate.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader color="success">Information</CardHeader>
      <CardBody>
        <h4 className={cardSubtitle}>Review Target due Date:</h4>
        <p>{dateString}</p>
        <h4 className={cardSubtitle}>Review Description:</h4>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
};

export default Information;
