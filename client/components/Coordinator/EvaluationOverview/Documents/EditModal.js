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
import SubjectIcon from "@material-ui/icons/Subject";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

// CUSTOM COMPONENTS
import ApplyTo from "./../Justifications/ApplyTo.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
});

import React, { useState } from "react";

const EditModal = ({ createModal }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const handleSave = () => {
    setModal(false);
    // commit the saved data to database
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
        color={createModal ? "primary" : "white"}
        onClick={() => setModal(true)}
      >
        <EditIcon />
        {createModal ? "Add New Document" : "Edit"}
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
          <h3>{createModal ? "Add New" : "Edit Existing"}</h3>
        </DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={5}>
              <Card>
                <CardHeader color="success">Document Metadata</CardHeader>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Description"
                        inputProps={{
                          multiline: true,
                          rows: 4,
                        }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Link"
                        formControlProps={{
                          fullWidth: true,
                        }}
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
            {createModal ? "Create" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditModal;
