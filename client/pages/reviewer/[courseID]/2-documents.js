import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Custom Hooks
import {useCurrentReviewOfUser} from "components/customHooks/ReviewerReviewLoad"
// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerDocumentsListing from "components/reviewer/ReviewerDocumentsListing";
import ReviewerPageCardDescription from "components/reviewer/ReviewerPageCardDescription";
import ReviewerPageBottomNavigation from "components/reviewer/ReviewerPageBottomNavigation";

// Redux
import { useSelector } from "react-redux";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);


const ReviewerCourseReviewPage2 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);

  // Load the Reviewer using custom useEffect Hook
  useCurrentReviewOfUser(authUser,reviewState,courseID)

  const classes = useStyles();
  const pageNumber = 2

  return (
    <div>
      <ReviewProgress review={review}></ReviewProgress>
      <ReviewerPageCardDescription pageNumber={pageNumber}></ReviewerPageCardDescription>
      <ReviewerDocumentsListing></ReviewerDocumentsListing>
      <ReviewerPageBottomNavigation
        pageNumber={pageNumber}
        course_id={courseID}
      ></ReviewerPageBottomNavigation>
    </div>
  );
};

export default ReviewerCourseReviewPage2;
