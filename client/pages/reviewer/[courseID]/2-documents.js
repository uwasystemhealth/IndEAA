import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerPageCardDescription from "components/reviewer/ReviewerPageCardDescription";
import ReviewerPageBottomNavigation from "components/reviewer/ReviewerPageBottomNavigation";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

import { getOrCreateReview, updateCurrentlyBeingViewedCourse } from "utils";

const ReviewerCourseReviewPage2 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);

  // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
  // If it cannot find it, then create it
  // Executes on Component Remount (after auth user is fetched)
  useEffect(() => {
    // Only Call when authUser is now defined
    if (authUser && (reviewState.queryResult.total<=0 || review.course_id !== courseID)) {
      getOrCreateReview(courseID, authUser._id);
      updateCurrentlyBeingViewedCourse(courseID)
    }
  }, [authUser]);

  const classes = useStyles();
  const pageNumber = 2

  return (
    <div>
      <ReviewProgress review={review}></ReviewProgress>
      <ReviewerPageCardDescription pageNumber={pageNumber}></ReviewerPageCardDescription>
      <ReviewerPageBottomNavigation
        pageNumber={pageNumber}
        course_id={courseID}
      ></ReviewerPageBottomNavigation>
    </div>
  );
};

export default ReviewerCourseReviewPage2;
