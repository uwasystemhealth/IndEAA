import Button from "components/MaterialKit/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomInput from "components/MaterialKit/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Placeholder from "@material-ui/icons/Subject";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

// FORM Material UI
import InputAdornment from '@material-ui/core/InputAdornment';

// Redux
import { useDispatch, useSelector } from "react-redux"
import { services } from "store/feathersClient"

// CUSTOM COMPONENTS
import ApplyTo from "./../Justifications/ApplyTo.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
});

import React, { useState } from "react";


const CustomFormField = ({ label, fieldName, handleChange, icon, required = false, value = '', error = ''
,inputProps,formControlProps}) => (
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
        ...formControlProps
      }}
      inputProps={{
        endAdornment: <InputAdornment position='end'>{icon}</InputAdornment>,
        onChange: handleChange,
        value,
        ...inputProps,
      }}
    />
  );


const EditModal = ({ document, course_id }) => {
  const isCreateModal = typeof document === "undefined"
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [state,setState] = useState({
    name: document && document.name || "",
    description: document && document.description || "",
    link: document && document.link || "",
    tags: document && document.tags || []
  })

  const handleChange = (event)=>{
    const { id, value } = event.target;
    const newState = { ...state, [id]: value };
    setState(newState)
    console.log(state)
  }

  const handleSave = (event) => {
    setModal(false);
    // commit the saved data to database

    if(isCreateModal){
      services["course-evaluation"].patch(course_id,{
        $push: {documents: state}
      })
    }
    else{
      services["course-evaluation"].patch(course_id,{
        "documents.$": state
      }, {query: {"documents._id":document._id}})
    }
  };

  const eocs = [
    {
      _id: "a",
      EOCNum: "1.2",
      desc: "aaha",
    },
    {
      _id: "b",
      EOCNum: "1.3",
      desc: "badga",
    },
  ];


  return (
    <>
      <Button
        color={isCreateModal ? "primary" : "white"}
        onClick={() => setModal(true)}
      >
        <EditIcon />
        {isCreateModal ? "Add New Document" : "Edit"}
      </Button>
      <Dialog
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className={classes.modalHeader}>
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h3>{isCreateModal ? "Add New" : "Edit Existing"}</h3>
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
                        label = "Document Name"
                        fieldName="name"
                        handleChange={handleChange}
                        value = {state["name"]}
                        icon={<Placeholder></Placeholder>}
                      >
                      </CustomFormField>
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomFormField
                      required
                        label="Description"
                        fieldName="description"
                        handleChange={handleChange}
                        value={state["description"]}
                        inputProps={{
                          multiline: true,
                          rows: 4,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomFormField
                          required
                          label = "Document Link"
                          fieldName="link"
                          handleChange={handleChange}
                          value = {state["link"]}
                          icon={<Placeholder></Placeholder>}
                        />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={7}>
              <ApplyTo eocs={eocs} />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button color="primary" onClick={() => handleSave()}>
            {isCreateModal ? "Create" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditModal;
