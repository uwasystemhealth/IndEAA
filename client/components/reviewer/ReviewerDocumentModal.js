// React + Redux + Functionality
import React, { useState, useEffect } from 'react';
import { services } from 'store/feathersClient';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

// Icons
import Close from '@material-ui/icons/Close';

// Styles
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  ...modalStyle,
});

// COPY PASTED CODE, this should be refactored
const CustomFormField = ({
  label,
  fieldName,
  handleChange,
  icon,
  required = false,
  value = '',
  error = '',
  inputProps,
  formControlProps,
}) => (
  <CustomInput
    success={!error && !!value}
    error={!!error}
    required={required}
    labelText={label}
    key={fieldName}
    id={fieldName}
    helperText={error}
    formControlProps={{
      fullWidth: true,
      ...formControlProps,
    }}
    inputProps={{
      endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      onChange: handleChange,
      value,
      ...inputProps,
    }}
  />
);

const ReviewerDocumentModal = ({
  documentReview,
  review_id,
  isOpen,
  setClose,
}) => {
  const isCreateModal = typeof document === 'undefined';
  const classes = useStyles();

  // Get 2 part information
  const { document, reviewComment } = documentReview || {};

  const initialStateModal = {
    comment: reviewComment?.comment || '',
  };

  const [state, setModalState] = useState(initialStateModal);

  // Rerenders on everytime the document changes
  useEffect(() => {
    setModalState(initialStateModal);
  }, [documentReview]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = { ...state, [id]: value };
    setModalState(newState);
  };

  const handleSave = (event) => {
    setClose();
    if (reviewComment) {
      // Review exists, so edit it here
      services.review.patch(
        review_id,
        {
          'step2Documents.$': {
            ...reviewComment,
            comment:state.comment,
          },
        },
        { query: { 'step2Documents.document_id': document._id } }
      );
    } else {
      // Review does not yet exist, so create it here
      services.review.patch(review_id, {
        $push: {  step2Documents: {...state, document_id: document._id} },
      });
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={() => setClose()}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className={classes.modalHeader}>
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setClose()}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h3>Comment on {document?.name}</h3>
        </DialogTitle>
        <DialogContent>
          <GridContainer>
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12}>
                    <CustomFormField
                      required
                      label="Comment on Document"
                      fieldName="comment"
                      handleChange={handleChange}
                      value={state['comment']}
                      inputProps={{
                        multiline: true,
                        rows: 4,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClose()}>Cancel</Button>
          <Button color="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewerDocumentModal;
