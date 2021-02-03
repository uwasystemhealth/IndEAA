import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// material-ui components
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import People from '@material-ui/icons/People';
import Datetime from 'react-datetime';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';

// Redux
import { signIn } from 'actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const useStyles = makeStyles({
    ...modalStyle,
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    label: {
        cursor: 'pointer',
        paddingLeft: '0',
        color: 'rgba(0, 0, 0, 0.26)',
        fontSize: '14px',
        lineHeight: '1.428571429',
        fontWeight: '400',
        display: 'inline-flex',
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EvaluationModal = ({ closeModal, isOpen, isEditModal }) => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const courseEvaluation = useSelector(state => state['course-evaluation']);
    const courseData = courseEvaluation?.data;
    console.log(courseData);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        setCode(courseData?.courseId || '');
        setDescription(courseData?.reviewDescription || '' );
        setDueDate(courseData?.dueDate || '');
    }, [courseData]);

    const createEvaluation = async (code, description, dueDate) => {
        try {
            const response = await services['course-evaluation'].create({
                courseId: code,
                reviewDescription: description,
                dueDate,
            });

            // Update User Permission in interface
            await dispatch(signIn(true));

            router.push(`coordinator/${response.value._id}`);
        } catch (error) {
            console.error(error);
            // Handled by Redux Saga
        }
    };

    const editEvaluation = async (code, description, dueDate, id) => {
        try {
            await services['course-evaluation'].patch(id, {
                courseId: code,
                reviewDescription: description,
                dueDate,
            });
    
            closeModal();
        } catch (error) {
            console.error(error);
            // Handled by Redux Saga
        }
    };

    const handleSubmit = () => isEditModal 
        ? editEvaluation(code, description, dueDate, evaluationId): 
        createEvaluation(code, description, dueDate);

    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.dialogPaper,
            }}
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            disableBackdropClick
            fullWidth
            maxWidth="md"
            scroll="paper"
            onClose={() => closeModal()}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
            >
                <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => closeModal()}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>{isEditModal ? 'Edit Evaluation' : 'Creating a new evaluation' }</h4>
            </DialogTitle>
            <DialogContent id="modal-slide-description" className={classes.modalBody}>
                <CustomInput
                    labelText="Course Identifier (unit code)"
                    id="float"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <People />
                            </InputAdornment>
                        ),
                        value: code,
                        onChange: (e) => setCode(e.target.value),
                    }}
                />
                <CustomInput
                    labelText="Course Description"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <People />
                            </InputAdornment>
                        ),
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                    }}
                />
                <InputLabel className={classes.label}>Review due date</InputLabel>
                <br />
                <FormControl fullWidth>
                    <Datetime
                        onChange={(date) => {
                            setDueDate(date);
                        }}
                        value={dueDate}
                        placeholder="13/05/2031"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + ' ' + classes.modalFooterCenter}
            >
                <Button onClick={() => closeModal()}>Never Mind</Button>
                <Button
                    onClick={() => {
                        handleSubmit();
                    }}
                    color="success"
                >
                    {isEditModal ? 'Save Edit' : 'Create evaluation' }
          
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EvaluationModal;