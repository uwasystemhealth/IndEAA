// React + Redux + Functionality
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom Components
import ReviewerPagePreSubmissionContent from 'components/reviewer/ReviewerPagePreSubmissionContent';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Utilities
import {useReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);

const ReviewerCourseReviewPage5 = () => {
    const router = useRouter();
    const { courseID, userID } = router.query;


    const userStateBeingViewed = useSelector(state=> state.users);
    const userBeingViewed = userStateBeingViewed?.data; // This will be used along with the component for showing user
    const reviewState = useSelector(state=> state.review);

    useEffect(() => {
        try
        { 
            services.users.get(userID);
        }
        catch(error){
            // Notification sent by Redux-Saga
        }
    }, []);

    // Load the Reviewer using custom useEffect Hook
    useReviewOfUser(userID,reviewState,courseID);

    const classes = useStyles();
    return (
        <> 
            {
                !(reviewState.isError && reviewState.isFinished) ?(
                    <div >
                        <Button href={`/coordinator/${courseID}`}>Go Back</Button>
                        <ReviewerPagePreSubmissionContent isReadOnly />
                    </div>
                ):
                    <>404 Not Found</>
            }
       
        </>
    );
};

export default ReviewerCourseReviewPage5;
