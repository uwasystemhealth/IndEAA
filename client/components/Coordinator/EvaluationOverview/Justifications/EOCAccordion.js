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
  // https://stackoverflow.com/questions/58539813/lazy-initial-state-what-is-and-where-to-use-it
  // https://github.com/uwasystemhealth/IndEAA/pull/27#discussion_r559902548
  const [eocs, setEocs] = useState(() => getEOCInfo());
  useEffect(() => {
    services["course-evaluation"].get({
      _id: evaluationID,
    });
  }, []);

  const courseEvaluation = useSelector((state) => state["course-evaluation"]);
  const eocReviews = courseEvaluation?.data?.eoc;

  let accordions = null;
  if (eocReviews !== null) {
    accordions = eocs.map((eocSet) => {
      const eocCards = eocSet.EOCS.map((eoc) => {
        const title = `EOC ${eocSet.setNum}.${eoc.EOCNum}`;

        const matchedIndex = eocReviews.findIndex((rev) =>
          rev.eocNumber.includes(`${eocSet.setNum}.${eoc.EOCNum}`)
        );
        const noReviewFound = matchedIndex === -1;

        const saveFields = (
          developmentLevel,
          justification,
          eocsInSameJustification
        ) => {
          let eocReviewsCopy = eocReviews;
          console.log(eocReviews);
          // Determine if there exist an entry with the same justification
          if (noReviewFound) {
            eocReviewsCopy.push({
              eocNumber: [`${eocSet.setNum}.${eoc.EOCNum}`],
              justification,
              developmentLevel,
              eocsInSameJustification,
            });
          } else {
            eocReviewsCopy[matchedIndex].justification = justification;
            eocReviewsCopy[matchedIndex].developmentLevel = developmentLevel;
            eocReviewsCopy[matchedIndex].eocNumber = eocsInSameJustification;
          }

          services["course-evaluation"].patch(evaluationID, {
            eoc: eocReviewsCopy,
          });
        };

        const rating = noReviewFound
          ? 0
          : eocReviews[matchedIndex].developmentLevel;
        const justification = noReviewFound
          ? null
          : eocReviews[matchedIndex].justification;
        const eocsInSameJustification = noReviewFound
          ? [eoc._id]
          : eocReviews[matchedIndex].eocNumber;

        return (
          <GridItem key={eoc.title} xs={4}>
            <EOCCard
              evaluationID={evaluationID}
              eocID={eoc._id}
              title={title}
              description={eoc.desc}
              eocsInSameJustification={eocsInSameJustification}
              save={saveFields}
              rating={rating}
              justification={justification}
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
  }

  return <Card>{accordions ?? <p>loading...</p>}</Card>;
};

export default EOCAccordion;
