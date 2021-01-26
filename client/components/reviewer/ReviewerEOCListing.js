// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// CUSTOM COMPONENTS
import EOCCard from 'components/Coordinator/EvaluationOverview/Justifications/EOCCard';
import ReviewerEOCModal from 'components/reviewer/ReviewerEOCModal';

import { useState } from 'react';

// Store Actions and Redux
import { useSelector } from 'react-redux';

import { getEOCInfo, getDetailsOfEntireEOC} from 'utils/eocs';

const EOCAccordion = ({isReadOnly}) => {
    // https://stackoverflow.com/questions/58539813/lazy-initial-state-what-is-and-where-to-use-it
    const [eocs, setEocs] = useState(() => getEOCInfo());
    const [selectedEOC, setSelectedEOC] = useState(null);

    const courseEvaluation = useSelector((state) => state['course-evaluation']);
    const reviewState = useSelector((state) => state.review);
    const review = reviewState?.queryResult.data[0];
    const eocReviews = courseEvaluation?.data?.eoc;

    const deselectEOC = () => setSelectedEOC(null);
    const getReviewEOCObject = (eocGeneralAndSpecific) =>
        review?.step3Evaluation.find(assessment => assessment.eoc === eocGeneralAndSpecific);

    // Create EOC Card Component Sets per Accordion
    let accordions = null;
    if (eocReviews !== null) {
        accordions = eocs.map((eocSet) => {
            const eocCards = eocSet.EOCS.map((eoc) => {
                const eocGeneralAndSpecific = `${eocSet.setNum}.${eoc.EOCNum}`;
                const {
                    rating =0,
                    reason = null,
                    ideaForImprovement
                } = getReviewEOCObject(eocGeneralAndSpecific) || {};

                return (
                    <GridItem key={eocGeneralAndSpecific} xs={4}>
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

    return (
        <>
            <Card>
                <ReviewerEOCModal
                    eocGeneralAndSpecific={selectedEOC}
                    reviewEOC = {getReviewEOCObject(selectedEOC)}
                    justification ={selectedEOC && getDetailsOfEntireEOC(selectedEOC,eocReviews)?.justification}
                    isOpen={Boolean(selectedEOC)}
                    closeModal={deselectEOC}
                    isReadOnly
                />
                {accordions ?? <p>loading...</p>}
            </Card>
        </>
    );
};

export default EOCAccordion;
