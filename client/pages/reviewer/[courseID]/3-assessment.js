import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Use own components// Custom Hooks
import {useCurrentReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerEOCListing from 'components/reviewer/ReviewerEOCListing';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);

import { getOrCreateReview, updateCurrentlyBeingViewedCourse } from 'utils';

const ReviewerCourseReviewPage3 = () => {
    const router = useRouter();
    const { courseID } = router.query;

    const reviewState = useSelector((state) => state.review);
    const review = reviewState.queryResult.data[0] || { course_id: courseID };
    const authUser = useSelector((state) => state.auth.user);

    // Load the Reviewer using custom useEffect Hook
    useCurrentReviewOfUser(authUser,reviewState,courseID);

    const classes = useStyles();
    const pageNumber = 3;
    return (
        <div>
            <ReviewProgress review={review} />{' '}
            <ReviewerPageCardDescription pageNumber={pageNumber} />
            <ReviewerEOCListing />
            <ReviewerPageBottomNavigation
                pageNumber={pageNumber}
                course_id={courseID}
            />
        </div>
    );
};

export default ReviewerCourseReviewPage3;
