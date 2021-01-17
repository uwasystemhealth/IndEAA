// CORE COMPONENTS
import Button from "components/MaterialKit/CustomButtons/Button.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomDropdown from "components/MaterialKit/CustomDropdown/CustomDropdown.js";
import TextField from "@material-ui/core/TextField";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

// redux
import { useSelector } from "react-redux"

// CUSTOM COMPONENTS
import ApplyTo from "./ApplyTo.js";
import DocumentViewer from "./DocumentViewer.js";

import { useState } from "react";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
const styles = { ...modalStyle };
const useStyles = makeStyles(styles);

import { developmentLevelToString, stringToDevelopmentLevel, getEOCInfo} from "utils.js";


const ViewModal = ({
  isOpen,
  closeModal,
  saveFields,
  title,
  eocID,
  description,
  rating,
  justification,
  eocsInSameJustification,
}) => {
  const classes = useStyles();

  // TODO: Will be used later
  const [state,setState] = useState({
    justification,
    developmentLevel: rating,
    eocsInSameJustification
  })

  // TODO: This variable needs to be change for formalisation
  // See editModal handleChange and form state
  const [just, setJust] = useState(justification);
  const [dl, setDl] = useState(rating);
  const [eocInSame,setEocInSame] = useState(eocsInSameJustification)

  // fix this or use this for props passing
  // I dont want to do prop drillings
  // I will just get course_id here
  const course = useSelector(state => state["course-evaluation"]).data

  const handleCheck = (eoc) =>{
    const eocIndex = eocInSame.findIndex(eocInState => eocInState === eoc)
    const eocs = eocInSame
    if(eocIndex==-1){ // eoc not in the state
      eocs.push(eoc)
    }
    else{
      eocs.splice(eocIndex,1) // Pops specific index
    }
    //const newState = eocInSame
    setEocInSame(eocInSame)
  }
  
  const handleSave = () => {
    saveFields(dl, just);
    closeModal();
  };

  const dropdownChange = (e) => {
    setDl(stringToDevelopmentLevel[e]);
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
        <h3>
          {title} - {description}
        </h3>
      </DialogTitle>

      <DialogContent>
        <GridContainer>
          <GridItem xs={6}>
            Development Level
            <HelpIcon />
            <CustomDropdown
              buttonText={developmentLevelToString[dl]}
              dropdownList={[
                developmentLevelToString[1],
                developmentLevelToString[2],
                developmentLevelToString[3],
                developmentLevelToString[4],
              ]}
              onClick={dropdownChange}
            />
          </GridItem>
          <GridItem xs={6}>
            <ApplyTo eocs={specificNumbers}
            eocInSame={eocInSame} handleCheck={handleCheck} />
          </GridItem>
          <GridItem xs={6}>
            Justification
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              value={just}
              onChange={(e) => setJust(e.target.value)}
            />
          </GridItem>
          <GridItem xs={6}>
            <DocumentViewer course_id={course._id} documents={course.documents} 
            eocBeingViewed={title}
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
