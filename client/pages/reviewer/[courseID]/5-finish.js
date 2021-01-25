import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Custom Hooks
import {useCurrentReviewOfUser} from "components/customHooks/ReviewerReviewLoad"

//Use Own Components
import ReviewerPageCardDescription from "components/reviewer/ReviewerPageCardDescription";
import ReviewerPagePreSubmissionContent from "components/reviewer/ReviewerPagePreSubmissionContent";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";


//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

import {getOrCreateReview} from "utils"

const ReviewerCourseReviewPage5 = () => {
    const router = useRouter()
    const { courseID } = router.query

    const reviewState = useSelector(state => state.review)
    const review = reviewState.queryResult.data[0] || {course_id:courseID}
    const authUser = useSelector((state) => state.auth.user);


      // Load the Reviewer using custom useEffect Hook
     useCurrentReviewOfUser(authUser,reviewState,courseID)

    const classes = useStyles();
    const pageNumber = 5
    return (
        <div >
        <ReviewerPageCardDescription
            pageNumber={pageNumber}
          ></ReviewerPageCardDescription>
            <ReviewerPagePreSubmissionContent isReadOnly></ReviewerPagePreSubmissionContent>
        </div>
    )
}

export default ReviewerCourseReviewPage5
