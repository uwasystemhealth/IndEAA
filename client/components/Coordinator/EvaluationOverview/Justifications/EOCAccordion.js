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

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

import { getEOCInfo } from "utils.js";

const EOCAccordion = ({ evaluationID }) => {
  const [eocs, setEcos] = useState(() => getEOCInfo());

  useEffect(() => {
    services["course-evaluation"].get({
      _id: evaluationID,
    });
  }, []);

  const courseEvaluation = useSelector((state) => state["course-evaluation"]);
  const eocReviews = courseEvaluation?.data?.eoc;

  if (eocReviews === null) {
    return <p>loading</p>;
  }

  const accordions = eocs.map((eocSet) => {
    const eocCards = eocSet.EOCS.map((eoc) => {
      const title = `EOC ${eocSet.setNum}.${eoc.EOCNum}`;

      const matchedIndex = eocReviews.findIndex((rev) =>
        rev.eocNumber.includes(`${eocSet.setNum}.${eoc.EOCNum}`)
      );

      const saveFields = (developmentLevel, justification) => {
        let eocReviewsCopy = eocReviews;
        if (matchedIndex === -1) {
          eocReviewsCopy.append({
            eocNumber: [`${eocSet.setNum}.${eoc.EOCNum}`],
            justification,
            developmentLevel,
          });
        } else {
          eocReviewsCopy[matchedIndex].justification = justification;
          eocReviewsCopy[matchedIndex].developmentLevel = developmentLevel;
        }

        services["course-evaluation"].patch(evaluationID, {
          eoc: eocReviewsCopy,
        });
      };

      const rating =
        matchedIndex === -1 ? 0 : eocReviews[matchedIndex].developmentLevel;
      const justification =
        matchedIndex === -1 ? null : eocReviews[matchedIndex].justification;

      return (
        <GridItem key={eoc.title} xs={4}>
          <EOCCard
            evaluationID={evaluationID}
            eocID={eoc._id}
            title={title}
            description={eoc.desc}
            rating={rating}
            justification={justification}
            save={saveFields}
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
