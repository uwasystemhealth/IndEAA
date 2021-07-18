// React + Redux + Functionality
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom components
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';

// Material UI
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import People from '@material-ui/icons/People';


import Close from '@material-ui/icons/Close';

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

const CreateEOCModal = ({closeModal, isOpen, selectedGeneralEoc}) => {
  const classes = useStyles();
  const evaluationData = useSelector(state => state['course-evaluation'])?.data;
  const generalEocs = evaluationData.generalEocs;

  const [specificNum, setSpecificNum] = useState('');
  const [desc, setDesc] = useState('');
  const [IOAs, setIOAs] = useState([]);

  const handleSubmit = async () => {
    try {
      const generalIndex = generalEocs.findIndex(x => x._id == selectedGeneralEoc);
      const clonedGeneralEocs = JSON.parse(JSON.stringify(generalEocs));  // Clone
      clonedGeneralEocs[generalIndex].specificEocs.push({
        'specificNum': specificNum,
        'desc': desc,
        'indicatorsOfAttainment': IOAs
      });

      await services['course-evaluation'].patch(selectedGeneralEoc, {'generalEocs': clonedGeneralEocs});

      closeModal();
    } catch(error) {
      console.error(error);
    }
  };

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
        <h4 className={classes.modalTitle}>Hello world!</h4>
      </DialogTitle>
      <DialogContent id="modal-slide-description" className={classes.modalBody}>
        <CustomInput
          labelText="Specific EOC Number"
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
            value: specificNum,
            onChange: (e) => setSpecificNum(e.target.value),
          }}
        />
        <CustomInput
          labelText="EOC Description"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <People />
              </InputAdornment>
            ),
            value: desc,
            onChange: (e) => setDesc(e.target.value),
          }}
        />
        {/* <InputLabel className={classes.label}>Review due date</InputLabel>
            <br />
            <FormControl fullWidth>
            <Datetime
            onChange={(date) => {
            setDueDate(date);
            }}
            value={dueDate}
            placeholder="13/05/2031"
            />
            </FormControl> */}
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
          SAVE CHANGES

        </Button>
      </DialogActions>
    </Dialog>
    
  );
};

export default CreateEOCModal;
