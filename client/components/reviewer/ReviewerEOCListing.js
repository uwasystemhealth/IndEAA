// React + Redux + Functionality
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Custom Components
import EOCCard from 'components/Coordinator/EvaluationOverview/Justifications/EOCCard';
import ReviewerEOCModal from 'components/reviewer/ReviewerEOCModal';

// Utilities
import { getDetailsOfEntireEOC} from 'utils/eocs';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const EOCAccordion = ({isReadOnly}) => {
  // https://stackoverflow.com/questions/58539813/lazy-initial-state-what-is-and-where-to-use-it
  // const [eocs,] = useState(() => getEOCInfo());
  const [selectedEOC, setSelectedEOC] = useState(null);

  const courseEvaluation = useSelector((state) => state['course-evaluation']);
  const generalEocs = courseEvaluation?.data?.generalEocs ?? [];

  const reviewState = useSelector((state) => state.review);
  const review = reviewState?.queryResult.data[0];
  const eocReviews = courseEvaluation?.data?.eocRemarks;

  const deselectEOC = () => setSelectedEOC(null);
  const getReviewEOCObject = (eocGeneralAndSpecific) =>
    review?.step3Evaluation.find(assessment => assessment.eoc === eocGeneralAndSpecific);

  // Create EOC Card Component Sets per Accordion
  let accordions = null;
  if (eocReviews !== null) {
    accordions = generalEocs?.map((eocSet) => {
      const eocCards = eocSet.specificEocs.map((eoc) => {
        const eocGeneralAndSpecific = `${eocSet.generalNum}.${eoc.specificNum}`;
        const {
          rating =0,
          reason = null,
          ideaForImprovement
        } = getReviewEOCObject(eocGeneralAndSpecific) || {};

        return (
          <GridItem key={eocGeneralAndSpecific} md={4}>
            <EOCCard
              isReviewer
              eocGeneralAndSpecific={eocGeneralAndSpecific}
              description={eoc.desc}
              rating={rating}
              reason={reason}
              ideaForImprovement= {ideaForImprovement}
              handleView={() => setSelectedEOC(eocGeneralAndSpecific)}
            />
          </GridItem>
        );
      });

      return (
        <Accordion key={eocSet.generalNum}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            EOC {eocSet.setNum}: {eocSet.generalName}
          </AccordionSummary>
          <AccordionDetails>
            <GridContainer>{eocCards}</GridContainer>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  console.log(selectedEOC, eocReviews)
  console.log(selectedEOC && getDetailsOfEntireEOC(selectedEOC,eocReviews))

  return (
    <>
      <Card>
        <ReviewerEOCModal
          eocGeneralAndSpecific={selectedEOC}
          reviewEOC = {getReviewEOCObject(selectedEOC)}
          justification ={selectedEOC && getDetailsOfEntireEOC(selectedEOC,eocReviews)?.justification}
          isOpen={Boolean(selectedEOC)}
          closeModal={deselectEOC}
          isReadOnly={isReadOnly}
        />
        {accordions ?? <p>Loading... (or ask your coordinator to add some EOCs)</p>}
      </Card>
    </>
  );
};

export default EOCAccordion;
