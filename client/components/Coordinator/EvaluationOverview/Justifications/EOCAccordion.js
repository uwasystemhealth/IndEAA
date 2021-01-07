// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import EOCCard from "./EOCCard.js";

import { useState, useEffect } from "react";

const EOCAccordion = ({ eocs }) => {
  const accordions = eocs.map((eocSet) => {
    const eocCards = eocSet.EOCS.map((eoc) => {
      const title = `EOC ${eocSet.setNum}.${eoc.EOCNum}`;

      return (
        <GridItem key={eoc._id} xs={4}>
          <EOCCard
            key={title}
            eocID={eoc._id}
            title={title}
            description={eoc.desc}
            rating={null}
            justification={null}
          />
        </GridItem>
      );
    });

    return (
      <Accordion key={eocSet.setNum}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          EOC {eocSet.setNum}: {eocSet.setName}
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer>{eocCards}</GridContainer>
        </AccordionDetails>
      </Accordion>
    );
  });

  return <Card>{accordions}</Card>;
};

export default EOCAccordion;
