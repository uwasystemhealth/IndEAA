// CORE COMPONENTS
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "components/MaterialKit/CustomButtons/Button.js";

// CUSTOM COMPONENTS
import ReviewerListing from "./ReviewerListing.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
});

import React, { useState } from "react";

const ManageReviewers = ({ courseTitle }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button color="info" onClick={() => setModal(true)}>
        Manage Coordinators
      </Button>

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          {courseTitle} Reviewers
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};

export default ManageReviewers;
