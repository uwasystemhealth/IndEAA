// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// CUSTOM COMPONENTS
import EOCCard from './EOCCard.js';
import ViewModal from './ViewModal.js';

import { useState, useEffect } from 'react';

// Store Actions and Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

import { getEOCInfo, getIndexOfEOCMatch, getDetailsOfEntireEOC} from 'utils/eocs';

const EOCAccordion = ({ evaluationID }) => {
    // https://stackoverflow.com/questions/58539813/lazy-initial-state-what-is-and-where-to-use-it
    const [eocs, setEocs] = useState(() => getEOCInfo());
    const [selectedEOC, setSelectedEOC] = useState(null);
    useEffect(() => {
        services['course-evaluation'].get({
            _id: evaluationID,
        });
    }, []);

    const courseEvaluation = useSelector((state) => state['course-evaluation']);
    const eocReviews = courseEvaluation?.data?.eoc;

    const saveFields = (
        eocGeneralAndSpecific,
        developmentLevel,
        justification,
        eocsInSameJustification
    ) => {
        console.log('WTYFF');
   
        const eocReviewsCopy = JSON.parse(JSON.stringify(eocReviews));  // Clone
        const matchedIndex = getIndexOfEOCMatch(eocGeneralAndSpecific, eocReviewsCopy);
        console.log(eocGeneralAndSpecific, 'is it included in ', eocReviewsCopy);
        console.log(matchedIndex);
        const noReviewFound = matchedIndex === -1;
        // Determine if there exist an entry with the same justification
        if (noReviewFound) {
            eocReviewsCopy.push({
                eocNumber: eocsInSameJustification,
                justification,
                developmentLevel,
            });
        } else if (eocsInSameJustification.length === 0){ 
            // If the eocNumber is empty, it means the justification is being deleted
            eocReviewsCopy.splice(matchedIndex,1);
        } 
        else {
            eocReviewsCopy[matchedIndex].justification = justification;
            eocReviewsCopy[matchedIndex].developmentLevel = developmentLevel;
            eocReviewsCopy[matchedIndex].eocNumber = eocsInSameJustification;
        }

        services['course-evaluation'].patch(evaluationID, {
            eoc: eocReviewsCopy,
        });
    };

    const deselectEOC = () => setSelectedEOC(null);

    // Create EOC Card Component Sets per Accordion
    let accordions = null;
    if (eocReviews !== null) {
        accordions = eocs.map((eocSet) => {
            const eocCards = eocSet.EOCS.map((eoc) => {
                const eocGeneralAndSpecific = `${eocSet.setNum}.${eoc.EOCNum}`;
                const {
                    rating,
                    justification,
                    eocsInSameJustification,
                } = getDetailsOfEntireEOC(eocGeneralAndSpecific,eocReviews);

                return (
                    <GridItem key={eocGeneralAndSpecific} xs={4}>
                        <EOCCard
                            eocGeneralAndSpecific={eocGeneralAndSpecific}
                            description={eoc.desc}
                            eocsInSameJustification={eocsInSameJustification}
                            rating={rating}
                            justification={justification}
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
                <ViewModal
                    eocGeneralAndSpecific={selectedEOC}
                    detailsOfEOC={getDetailsOfEntireEOC(selectedEOC,eocReviews)}
                    isOpen={Boolean(selectedEOC)}
                    closeModal={deselectEOC}
                    saveFields={saveFields}
                />
                {accordions ?? <p>loading...</p>}
            </Card>
        </>
    );
};

export default EOCAccordion;
