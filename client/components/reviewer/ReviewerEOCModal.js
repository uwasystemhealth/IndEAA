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
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Muted from 'components/MaterialKit/Typography/Muted';

// Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// CUSTOM COMPONENTS
import DocumentViewer from 'components/Coordinator/EvaluationOverview/Justifications/DocumentViewer.js';

import { useState, useEffect } from 'react';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const styles = { ...modalStyle };
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
    reviewEOC,
    justification,
    isOpen,
    closeModal,
    isReadOnly, // For finished Reviews or coordinator viewing
}) => {
    const classes = useStyles();

    const { rating = 0, reason = '', ideaForImprovement = '' } = reviewEOC || {};
    const { desc: description = '', indicatorsOfAttainment = [] } =
    getStaticDetailsOfEOC(eocGeneralAndSpecific) || {};

    const initialStateModal = {
        rating,
        reason,
        ideaForImprovement,
    };

    const [state, setModalState] = useState(initialStateModal);

    // Rerenders on everytime the EOC changes
    useEffect(() => {
        setModalState(initialStateModal);
    }, [eocGeneralAndSpecific]);

    const course = useSelector((state) => state['course-evaluation'])?.data;
    const reviewState = useSelector((state) => state.review);
    const review = reviewState?.queryResult.data[0];

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
            rating: stringToDevelopmentLevel[string],
        };
        setModalState(newState);
    };

    const handleSave = (event) => {
        closeModal();

        if (reviewEOC) {
            // If the review assessment exist, then update it
            services.review.patch(
                review._id,
                {
                    'step3Evaluation.$': {
                        ...state,
                        eoc: eocGeneralAndSpecific,
                    },
                },
                { query: { 'step3Evaluation.eoc': eocGeneralAndSpecific } }
            );
        } else {
            // If the review assessment does not exist, create a new one
            services.review.patch(review._id, {
                $push: { step3Evaluation: { ...state, eoc: eocGeneralAndSpecific } },
            });
        }
    };

    // TODO: get Display EOCS (borrowed from EditModal.js) - needs to be transferred to utils.js
    const eocs = getEOCInfo(course?._id);
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
                        <GridItem>
                            <Card>
                                <CardBody>
                                    <h4 className={classes.cardTitle}>
                    Justification of Coordinators
                                    </h4>
                                    <p>{justification}</p>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card>
                                <CardBody>
                                    <h4 className={classes.cardTitle}>
                    Indicators of Attainment
                                    </h4>
                                    {indicatorsOfAttainment.map(indicator=> <p key={indicator}>{indicator}</p>)}
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
              Development Level
                            {!isReadOnly ? (
                                <CustomDropdown
                                    buttonText={developmentLevelToString[state.rating]}
                                    dropdownList={developmentLevel.map(
                                        ({ short, meaning }, index) => (
                                            <>
                                                <h6>{`Level ${index + 1} - ${short}`}</h6>
                                                <Muted>{meaning}</Muted>
                                            </>
                                        )
                                    )}
                                    id="developmentLevel"
                                    onClick={handleDropdownChange}
                                />
                            ) : (
                                <Button>{developmentLevelToString[state.rating]}</Button>
                            )}
                        </GridItem>

                        <GridItem>
              Justification for Selected Development Level
                            <TextField
                                multiline
                                fullWidth
                                rows={4}
                                variant="filled"
                                value={state.reason}
                                id="reason"
                                onChange={handleChange}
                                disabled={isReadOnly}
                            />
                        </GridItem>
                        <GridItem>
              Suggestions for Improvement
                            <TextField
                                multiline
                                fullWidth
                                rows={4}
                                variant="filled"
                                value={state.ideaForImprovement}
                                id="ideaForImprovement"
                                onChange={handleChange}
                                disabled={isReadOnly}
                            />
                        </GridItem>
                    </GridItem>
                    <GridItem md={6}>
                        <GridItem>
                            <DocumentViewer
                                course_id={course?._id}
                                review_id={review?._id}
                                documents={course?.documents}
                                eocBeingViewed={eocGeneralAndSpecific}
                                isReviewer
                                isReadOnly={isReadOnly}
                            />
                        </GridItem>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeModal()}>Cancel</Button>
                {!isReadOnly && (
                    <Button color="primary" onClick={() => handleSave()}>
            Save
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ViewModal;
