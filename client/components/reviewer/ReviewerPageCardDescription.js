import React from "react";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from "assets/jss/nextjs-material-kit.js";

const styles = {
  cardTitle,
  cardLink,
  cardSubtitle,
};

const useStyles = makeStyles(styles);

import { reviewSteps } from "utils";

const ReviewerPageCardDescription = ({ pageNumber }) => {
  const classes = useStyles();
  const {stepName, stepDescription} = reviewSteps[pageNumber -1]
  return (
    <GridContainer alignItems="center" justify="center">
      <GridItem md={8}>
        <Card >
          <CardBody>
            <h4 className={classes.cardTitle}>{stepName}</h4>
            <h6 className={classes.cardSubtitle}>Step {pageNumber}</h6>
            <p>
              {stepDescription}
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ReviewerPageCardDescription;
