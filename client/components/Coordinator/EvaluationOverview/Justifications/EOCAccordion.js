// React + Redux + Functionality
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';
import { useState } from 'react';

// Custom Components
import EOCCard from './EOCCard.js';
import CreateEOCModal from './CreateEOCModal.js';
import ViewModal from './ViewModal.js';

// Utilities
import { getIndexOfEOCMatch, getDetailsOfEntireEOC} from 'utils/eocs';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  accordionFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1em'
  },
}));

const EOCAccordion = () => {
  const classes = useStyles();

  const [selectedEOC, setSelectedEOC] = useState(null);
  const [selectedGeneralEOC, setSelectedGeneralEOC] = useState(null);
  const deselectGeneralEOC = () => setSelectedGeneralEOC(null);
  const deselectEOC = () => setSelectedEOC(null);

  const course = useSelector((state) => state['course-evaluation']);
  console.log("COURSEDATA", course)
  const courseData = course?.data;
  const generalEocs = courseData?.generalEocs;
  const eocRemarks = courseData?.eocRemarks;

  // Logic for updating/creating a new rating & justification
  const saveFields = (
    eocGeneralAndSpecific,
    developmentLevel,
    justification,
    eocsInSameJustification
  ) => {
    const eocReviewsCopy = JSON.parse(JSON.stringify(eocRemarks));  // Clone
    const matchedIndex = getIndexOfEOCMatch(eocGeneralAndSpecific, eocReviewsCopy);
    const noReviewFound = matchedIndex === -1;
    // Determine if there exist an entry with the same justification
    if (noReviewFound) {
      eocReviewsCopy.push({
        eocNumber: eocsInSameJustification,
        justification,
        developmentLevel,
      });
    } else if (eocsInSameJustification.length === 0) {
      // If the eocNumber is empty, it means the justification is being deleted
      eocReviewsCopy.splice(matchedIndex,1);
    } 
    else {
      eocReviewsCopy[matchedIndex].justification = justification;
      eocReviewsCopy[matchedIndex].developmentLevel = developmentLevel;
      eocReviewsCopy[matchedIndex].eocNumber = eocsInSameJustification;
    }

    services['course-evaluation'].patch(courseData?._id, {
      eoc: eocReviewsCopy,
    });
  };

  const createSpecificEoc = async (generalEoc, specificNum, desc, IOAs) => {
    try {
      console.log("THIS IS GENERALEOCS: ", generalEocs);
      const clonedGeneralEocs = JSON.parse(JSON.stringify(generalEocs));  // Clone

      // console.log(generalEocs)
      const generalIndex = generalEocs.findIndex(x => x.generalNum == generalEoc);
      const noGeneralEocFound = generalIndex === -1;
      if (noGeneralEocFound) {
        console.error("Can't create a specific EOC without a general EOC");
        // Error, can't create a specific EOC without a general EOC.
      } else {
        console.log({
          'specificNum': specificNum,
          'desc': desc,
          'indicatorsOfAttainment': IOAs,
        });
        clonedGeneralEocs[generalIndex].specificEocs.push({
          'specificNum': specificNum,
          'desc': desc,
          'indicatorsOfAttainment': IOAs.map(ioa => ioa.ioa)
        });

        services['course-evaluation'].patch(courseData?._id, {'generalEocs': clonedGeneralEocs});
      }

      closeModal();
    } catch(error) {
      console.error(error);
    }
  }

  // Create EOC Card Component Sets per Accordion
  let accordions = null;
  if (eocRemarks !== null) {
    accordions = courseData?.generalEocs.map((eocSet) => {
      const eocCards = eocSet.specificEocs.map((eoc) => {
        const eocGeneralAndSpecific = `${eocSet.generalNum}.${eoc.specificNum}`;
        const {
          rating,
          justification,
          eocsInSameJustification,
        } = getDetailsOfEntireEOC(eocGeneralAndSpecific,eocRemarks);

        return (
          <GridItem key={eocGeneralAndSpecific} md={10}>
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
        <Accordion key={eocSet.generalNum}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            EOC {eocSet.generalNum}: {eocSet.generalName}
          </AccordionSummary>
          <AccordionDetails>
            <GridContainer>{eocCards}</GridContainer>
          </AccordionDetails>
          <div className={classes.accordionFooter}>
            <Button onClick={() => setSelectedGeneralEOC(eocSet.generalNum)}>Add new Element of Competency (EOC)</Button>
          </div>
        </Accordion>
      );
    });
  }

  return (
    <>
      <Card>
        <ViewModal
          eocGeneralAndSpecific={selectedEOC}
          detailsOfEOC={getDetailsOfEntireEOC(selectedEOC, eocRemarks)}
          isOpen={Boolean(selectedEOC)}
          closeModal={deselectEOC}
          saveFields={saveFields}
        />
        {
          <CreateEOCModal
              isOpen={Boolean(selectedGeneralEOC)}
              closeModal={deselectGeneralEOC}
              selectedGeneralEoc={selectedGeneralEOC}
              saveFields={createSpecificEoc}
          />
        }
        {accordions ?? <p>loading...</p>}
      </Card>
    </>
  );
};

export default EOCAccordion;
