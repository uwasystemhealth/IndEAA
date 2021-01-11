// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Muted from "components/MaterialKit/Typography/Muted.js";
import Success from "components/MaterialKit/Typography/Success.js";
import Danger from "components/MaterialKit/Typography/Danger.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";

// CUSTOM COMPONENTS
import ViewModal from "./ViewModal.js";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "assets/jss/nextjs-material-kit.js";
const styles = {
  cardTitle,
};
const useStyles = makeStyles(styles);

import { services } from "store/feathersClient";
import React, { useState, useEffect } from "react";

import { developmentLevelToString } from "utils.js";

const EOCCard = (props) => {
  const {
    title,
    description,
    rating,
    justification,
    eocs,
    eocID,
    developmentLevel,
    evaluationID,
    save,
  } = props;
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const ratingMsg =
    rating != 0 ? (
      <Success>Your Rating: {developmentLevelToString[rating]}</Success>
    ) : (
      <Danger>Your Rating: None</Danger>
    );

  const justMsg =
    justification != null ? (
      <Success>Your Justification: {justification}</Success>
    ) : (
      <Danger>Your Justification: None</Danger>
    );

  const saveFields = (dl, just) => save(dl, just);

  return (
    <Card>
      <CardBody>
        <h4 className={classes.cardTitle}>{title}</h4>
        <GridContainer>
          <GridItem xs={8}>
            <Muted>{description}</Muted>
          </GridItem>
          <GridItem xs={4}>
            <Button color="white" onClick={() => setModal(true)}>
              <FindInPageIcon />
              View
            </Button>
            <ViewModal
              {...props}
              eocs={[]}
              isOpen={modal}
              closeModal={() => setModal(false)}
              saveFields={saveFields}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <GridContainer direction="column" alignItems="flex-start">
          <GridItem>{ratingMsg}</GridItem>
          <GridItem>{justMsg}</GridItem>
        </GridContainer>
      </CardFooter>
    </Card>
  );
};

export default EOCCard;
