// React + Redux + Functionality
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// Custom Components
import ApplyTo from './ApplyTo.js';
import DocumentViewer from './DocumentViewer.js';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import CustomDropdown from 'components/MaterialKit/CustomDropdown/CustomDropdown.js';
import Muted from 'components/MaterialKit/Typography/Muted';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Close from '@material-ui/icons/Close';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
import typographyStyle from 'assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle';
const styles = { ...modalStyle, ...typographyStyle };
const useStyles = makeStyles(styles);

import {
  getStaticDetailsOfEOC,
  developmentLevel,
  developmentLevelToString,
  stringToDevelopmentLevel,
  getEOCInfo,
} from 'utils/eocs';

const ViewModal = ({
  eocGeneralAndSpecific,
  detailsOfEOC,
  isOpen,
  closeModal,
  saveFields
}) => {
  const classes = useStyles();

  const { rating, justification, eocsInSameJustification } = detailsOfEOC;
  const {desc:description = ''} = getStaticDetailsOfEOC(eocGeneralAndSpecific) || {};

  const initialStateModal = {
    justification,
    developmentLevel: rating,
    eocsInSameJustification,
  };

  const [state, setModalState] = useState(initialStateModal);

  // Rerenders on everytime the EOC changes
  useEffect(() => {
    setModalState(initialStateModal);
  }, [eocGeneralAndSpecific]);

  // fix this or use this for props passing
  // I dont want to do prop drillings
  // I will just get course_id here
  const course = useSelector((state) => state['course-evaluation']).data;

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = { ...state, [id]: value };
    setModalState(newState);
  };

  const handleDropdownChange = (e) => {
    // Text Element of the Dropdown Header
    const string = e.props.children[0].props.children;
    const newState = {
      ...state,
      developmentLevel: stringToDevelopmentLevel[string],
    };
    setModalState(newState);
  };

  const handleCheck = (eoc) => {
    const eocIndex = state.eocsInSameJustification.findIndex(
      (eocInState) => eocInState === eoc
    );
    const eocs = state.eocsInSameJustification;
    if (eocIndex == -1) {
      // eoc not in the state
      eocs.push(eoc);
    } else {
      eocs.splice(eocIndex, 1); // Pops specific index
    }
    const newState = {...state, eocsInSameJustification: eocs};
    setModalState(newState);
  };



  const handleSave = () => {
    saveFields(
      eocGeneralAndSpecific,
      state.developmentLevel,
      state.justification,
      state.eocsInSameJustification
    );
    // Reset to null
    setModalState({
      justification:'',
      developmentLevel: 0,
      eocsInSameJustification:[],
    });
    closeModal();
  };

  // TODO: get Display EOCS (borrowed from EditModal.js) - needs to be transferred to utils.js
  const eocs = getEOCInfo(course._id);
  const specificNumbers = eocs.reduce((accumulator, current) => {
    const currentSetEocNumbers = current.EOCS.map(
      (eoc) => `${current.setNum}.${eoc.EOCNum}`
    );
    return [...accumulator, ...currentSetEocNumbers];
  }, []);

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={() => closeModal()}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle className={classes.modalHeader}>
        <IconButton
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => closeModal()}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h5 className={classes.title}>
          {eocGeneralAndSpecific} - {description}
        </h5>
      </DialogTitle>

      <DialogContent>
        <GridContainer>
          <GridItem md={6}>
            Development Level
            <CustomDropdown
              buttonText={developmentLevelToString[state.developmentLevel]}
              dropdownList={
                developmentLevel.map(({short,meaning},index)=>(
                  <>
                    <h6>{`Level ${index+1} - ${short}`}</h6>
                    <Muted>{meaning}</Muted>
                  </>
                ))
              }
              id="developmentLevel"
              onClick={handleDropdownChange}
            />
          </GridItem>
          <GridItem md={6}>
            <ApplyTo
              eocs={specificNumbers}
              eocInSame={state.eocsInSameJustification}
              handleCheck={handleCheck}
            />
          </GridItem>
          <GridItem md={6}>
            Justification
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              value={state.justification}
              id="justification"
              onChange={handleChange}
            />
          </GridItem>
          <GridItem md={6}>
            <DocumentViewer
              course_id={course._id}
              documents={course.documents}
              eocBeingViewed={eocGeneralAndSpecific}
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal()}>Cancel</Button>
        <Button color="primary" onClick={() => handleSave()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
