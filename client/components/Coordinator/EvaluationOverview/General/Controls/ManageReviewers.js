// React + Redux + Functionality
import { useSelector } from 'react-redux';
import { services, rawServices } from 'store/feathersClient';
import { useState } from 'react';

// Custom Components
import ReviewerListing from './ReviewerListing.js';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';

// Icons
import People from '@material-ui/icons/People';
import SendIcon from '@material-ui/icons/Send';

// Styles
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  ...modalStyle,
});

const ManageReviewers = ({ evaluationID }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');

  const courseEval = useSelector((state) => state['course-evaluation']);
  const evalData = courseEval?.data;

  // selects out all reviewers with correct permission
  const reviewers = evalData?.reviewers  || [];

  // removes a user from the evaluation
  const removePermission = async (userId, evaluationId) => {
    try {
      services['users'].patch(userId, {
        $pull: { perms: {course_id:evaluationId,role:'Reviewer'}}
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addPermissionToUser = async (email) => {
    try {
      const responseOnFind = await rawServices('users').find({ query:{email} });
      if(responseOnFind.total){
        const user = responseOnFind.data[0];
        // User Already Exist
        await services.users.patch(
          user._id,
          {
            $push:{
              perms:{course_id: evaluationID, role:'Reviewer'}
            }
          });
      }
      else{
        await services.users.create({
          email, 
          perms:[{course_id: evaluationID, role:'Reviewer'}] 
        });
      }
      setModal(false);
    } catch (error) {
      // Handled by Redux Saga
      console.error(error);
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
    addPermissionToUser(email);
    setEmail('');
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
