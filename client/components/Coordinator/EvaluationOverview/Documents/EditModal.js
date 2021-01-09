import Button from "components/MaterialKit/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

import EditIcon from "@material-ui/icons/Edit";

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
            <GridItem xs={6}>Name, desc link</GridItem>
            <GridItem xs={6}>
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
