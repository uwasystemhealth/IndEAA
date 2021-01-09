import Button from "components/MaterialKit/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import EditIcon from "@material-ui/icons/Edit";

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
        <DialogContent>Name: Description: Link: tags:</DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
