// CORE COMPONENTS
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import CustomInput from "components/MaterialKit/CustomInput/CustomInput.js";
import SendIcon from "@material-ui/icons/Send";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

// CUSTOM COMPONENTS
import ReviewerListing from "./ReviewerListing.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
});

import React, { useState } from "react";

const ManageReviewers = ({ courseTitle, reviewers }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const reviewerCards = reviewers?.map((reviewer) => (
    <ReviewerListing key={reviewer.name} {...reviewer} />
  ));

  return (
    <>
      <Button color="info" onClick={() => setModal(true)}>
        Manage Reviewers
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
          <h3>{courseTitle} Reviewers</h3>
        </DialogTitle>

        <DialogContent>{reviewerCards}</DialogContent>
        <DialogActions>
          <GridContainer>
            <GridItem xs={12}>
              <h3>Email of reviewer to invite</h3>
            </GridItem>
            <GridItem xs={6}>
              <CustomInput
                id="regular"
                labelText="reviewer@gmail.com"
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <Button color="white">
                <SendIcon />
                Invite
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageReviewers;
