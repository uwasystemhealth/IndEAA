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

// CUSTOM COMPONENTS
import Tags from "./Tags.js";

import React, { useState } from "react";

const EditModal = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button color="white" onClick={() => setModal(true)}>
        <EditIcon />
        Edit
      </Button>
      <Dialog
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Add New Document</DialogTitle>
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
              <Tags />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditModal;
