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
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";

// CUSTOM COMPONENTS
import ReviewerListing from "./ReviewerListing.js";

// STYLES
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  ...modalStyle,
});

// Store Actions and Redux
import { useSelector } from "react-redux";
import { services } from "store/feathersClient";

import { useState, useEffect } from "react";

const ManageReviewers = ({ evaluationID }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    services["course-evaluation"].get({
      _id: evaluationID,
    });
    services["users"].find({
      perms: {
        $in: [{ course_id: evaluationID, role: "Reviewer" }],
      },
    });
  }, []);

  const courseEval = useSelector((state) => state["course-evaluation"]);
  const evalData = courseEval?.data;
  const users = useSelector((state) => state["users"]);
  const userData = users?.queryResult?.data;

  // selects out all reviewers with correct permission
  const reviewers = userData.filter((user) =>
    user.perms.reduce(
      (acc, permission) =>
        acc ||
        (permission.course_id == evaluationID && permission.role == "Reviewer"),
      false
    )
  );

  // removes a user from the evaluation
  const removePermission = async (userId, evaluationId) => {
    try {
      const oldPermissions = reviewers.find((user) => user._id == userId).perms;
      const newPerms = oldPermissions.filter(
        (permission) =>
          !(
            permission.course_id == evaluationId &&
            permission.role == "Reviewer"
          )
      );
      const response = await services["users"].patch(userId, {
        perms: newPerms,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: refactor (copied from administrator code)
  const createUser = async (email) => {
    try {
      const response = await services.users.create({ email });
      closeModal();
      setCurrentUserSelected(response.value);
    } catch (error) {
      // Handled by Redux Saga
    }
  };

  const courseTitle = evalData?.courseId;
  const reviewerCards = reviewers?.map((reviewer) => (
    <ReviewerListing
      key={reviewer._id}
      {...reviewer}
      removeReviewer={() => removePermission(reviewer._id, evalData._id)}
    />
  ));

  const handleSubmit = () => {
    createUser(email);
    setEmail("");
  };

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
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <People />
                    </InputAdornment>
                  ),
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <Button onClick={() => handleSubmit(email)} color="white">
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
