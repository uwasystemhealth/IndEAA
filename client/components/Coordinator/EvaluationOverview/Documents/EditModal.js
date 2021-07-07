// React + Redux + Functionality
import { services } from 'store/feathersClient';
import React, { useState, useEffect } from 'react';

// Custom Components
import DesignedCheckBox from 'components/administrator/DesignedCheckBox';

// Utilities
import { getEOCInfo } from 'utils/eocs';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Placeholder from '@material-ui/icons/Subject';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import InputAdornment from '@material-ui/core/InputAdornment';

// Styles
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  ...modalStyle,
});

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

const ApplyTags = ({ tagsAllowed, tagsSelected, handleCheck }) => {

  return (
    <Card>
      <CardHeader color="success">Tags</CardHeader>
      <CardBody>
        <List>
          {tagsAllowed.map((tag) => {
            const isEOC = Boolean(parseFloat(tag)); // Non-floating point are false
            return(
              <DesignedCheckBox
                key={tag}
                onClick={() => handleCheck(tag)}
                isChecked={tagsSelected.includes(tag)}
                label={isEOC ? `EOC ${tag}` : tag}
              />
            );})}
        </List>
      </CardBody>
    </Card>
  );
};

const EditModal = ({ document, course_id, isOpen, setClose }) => {
  const isCreateModal = typeof document === 'undefined';
  const classes = useStyles();
  const initialStateModal = {
    name: document?.name || '',
    description: document?.description || '',
    link: document?.link || '',
    tags: document?.tags || [],
  };

  const [state, setModalState] = useState(initialStateModal);

  // Rerenders on everytime the document changes
  useEffect(() => {
    setModalState(initialStateModal);
  }, [document]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = { ...state, [id]: value };
    setModalState(newState);
  };

  const handleSave = () => {
    setClose();
    // commit the saved data to database

    if (isCreateModal) {
      services['course-evaluation'].patch(course_id, {
        $push: { documents: state },
      });
    } else {
      services['course-evaluation'].patch(
        course_id,
        {
          'documents.$': state,
        },
        { query: { 'documents._id': document._id } }
      );
    }
  };

  const handleCheck = (tag) => {
    const tagIndex = state.tags.findIndex((tagInState) => tagInState === tag);
    const tags = state.tags;
    if (tagIndex == -1) {
      // Tag not in the state
      tags.push(tag);
    } else {
      tags.splice(tagIndex, 1); // Pops specific index
    }
    const newState = { ...state, tags };
    setModalState(newState);
  };

  // Get all EOC both general EOC and specific EOC
  const eocs = getEOCInfo(course_id);
  const generalAndSpecificNumbers = eocs.reduce((accumulator, current) => {
    const currentSetEocNumbers = current.EOCS.map(
      (eoc) => `${current.setNum}.${eoc.EOCNum}`
    );
    return [...accumulator, String(current.setNum), ...currentSetEocNumbers];
  }, []);

  // Tags Allowed to be Applied
  const tagsAllowed = [
    ...generalAndSpecificNumbers,
    'introduction'
  ];

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
          <h3>{isCreateModal ? 'Add New' : 'Edit Existing'}</h3>
        </DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={5}>
              <Card>
                <CardHeader color="success">Document Metadata</CardHeader>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12}>
                      <CustomFormField
                        required
                        label="Document Name"
                        fieldName="name"
                        handleChange={handleChange}
                        value={state['name']}
                        icon={<Placeholder />}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomFormField
                        required
                        label="Description"
                        fieldName="description"
                        handleChange={handleChange}
                        value={state['description']}
                        inputProps={{
                          multiline: true,
                          rows: 4,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomFormField
                        required
                        label="Document Link"
                        fieldName="link"
                        handleChange={handleChange}
                        value={state['link']}
                        icon={<Placeholder />}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={7}>
              <ApplyTags
                tagsAllowed={tagsAllowed}
                tagsSelected={state.tags}
                handleCheck={handleCheck}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClose()}>Cancel</Button>
          <Button color="primary" onClick={() => handleSave()}>
            {isCreateModal ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditModal;
