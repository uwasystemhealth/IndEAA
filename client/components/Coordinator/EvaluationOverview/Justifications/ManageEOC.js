// CORE COMPONENTS
import Button from "components/MaterialKit/CustomButtons/Button.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import React, { useState } from "react";

const ManageEOC = ({ title }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button color="white" onClick={() => setModal(true)}>
        <FindInPageIcon />
        View
      </Button>
      <Dialog
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
      </Dialog>
    </>
  );
};

export default ManageEOC;
