// CORE COMPONENTS
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import CustomDropdown from 'components/MaterialKit/CustomDropdown/CustomDropdown.js';
import TextField from '@material-ui/core/TextField';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

// redux
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import ApplyTo from './ApplyTo.js';
import DocumentViewer from './DocumentViewer.js';

import { useState, useEffect } from 'react';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const styles = { ...modalStyle };
const useStyles = makeStyles(styles);

import {
    developmentLevelToString,
    stringToDevelopmentLevel,
    getEOCInfo,
} from 'utils.js';

const ViewModal = ({
    eocGeneralAndSpecific,
    detailsOfEOC,
    description,
    isOpen,
    closeModal,
    saveFields
}) => {
    const classes = useStyles();

    const { rating, justification, eocsInSameJustification } = detailsOfEOC;

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
        const newState = {
            ...state,
            developmentLevel: stringToDevelopmentLevel[e],
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
        console.log(state);
        console.log(saveFields);
        saveFields(
            eocGeneralAndSpecific,
            state.developmentLevel,
            state.justification,
            state.eocsInSameJustification
        );
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
                <h3>
                    {eocGeneralAndSpecific} - {description}
                </h3>
            </DialogTitle>

            <DialogContent>
                <GridContainer>
                    <GridItem xs={6}>
            Development Level
                        <HelpIcon />
                        <CustomDropdown
                            buttonText={developmentLevelToString[state.developmentLevel]}
                            dropdownList={[
                                developmentLevelToString[1],
                                developmentLevelToString[2],
                                developmentLevelToString[3],
                                developmentLevelToString[4],
                            ]}
                            id="developmentLevel"
                            onClick={handleDropdownChange}
                        />
                    </GridItem>
                    <GridItem xs={6}>
                        <ApplyTo
                            eocs={specificNumbers}
                            eocInSame={state.eocsInSameJustification}
                            handleCheck={handleCheck}
                        />
                    </GridItem>
                    <GridItem xs={6}>
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
                    <GridItem xs={6}>
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
