import { useEffect, useState } from "react"
import { useRouter } from "next/router"

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

    // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
    // If it cannot find it, then create it
    // Executes on Component Remount (after auth user is fetched)
    useEffect(() => {
        // Only Call when authUser is now defined
        if(authUser && review && review.course_id !== courseID){
            getOrCreateReview(courseID, authUser._id)
        }
        
    }, [authUser]);

    const classes = useStyles();
    return (
        <div >
            {courseID}
            ReviewerCourseReviewPage5
        </div>
    )
}

export default ReviewerCourseReviewPage5
