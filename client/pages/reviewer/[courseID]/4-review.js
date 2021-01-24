import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerPagePreSubmissionContent from "components/reviewer/ReviewerPagePreSubmissionContent";
import ReviewerPageCardDescription from "components/reviewer/ReviewerPageCardDescription";
import ReviewerPageBottomNavigation from "components/reviewer/ReviewerPageBottomNavigation";
import AreYouSureButton from "components/Other/AreYouSureButton";

// MaterialKit
import Button from "components/MaterialKit/CustomButtons/Button.js";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

// Utils
import { reviewSteps } from "utils";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

import { getOrCreateReview, updateCurrentlyBeingViewedCourse } from "utils";

const ReviewerCourseReviewPage4 = () => {
  const router = useRouter();
  const { courseID } = router.query;


  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  // Uses query result

  const authUser = useSelector((state) => state.auth.user);
  const courseState = useSelector((state) => state["course-evaluation"]);
  const course = courseState.data;

  // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
  // If it cannot find it, then create it
  // Executes on Component Remount (after auth user is fetched)
  useEffect(() => {
    // Only Call when authUser is now defined
    if (authUser) {
      if (reviewState.queryResult.total <= 0 || review.course_id !== courseID) {
        getOrCreateReview(courseID, authUser._id);
      }
      if (!course || courseID !== course._id) {
        updateCurrentlyBeingViewedCourse(courseID);
      }
    }
  }, [authUser]);
  
  const pageNumber = 4;
  const handleSubmit = () => {
    // Do validation to check the previous filled things or find in the page for any danger
    services.review.patch(review._id, {
      submittedDate: new Date(),
    });
    router.push(
      `/reviewer/${courseID}/${pageNumber + 1}-${
        reviewSteps[pageNumber].stepLink
      }`
    );
  };

  const classes = useStyles();
  return (
    <div>
      {reviewState.isFinished && courseState.isFinished ? (
        <>
          <ReviewProgress review={review}></ReviewProgress>
          <ReviewerPageCardDescription
            pageNumber={pageNumber}
          ></ReviewerPageCardDescription>
          <ReviewerPagePreSubmissionContent></ReviewerPagePreSubmissionContent>
          <ReviewerPageBottomNavigation
            pageNumber={pageNumber}
            course_id={courseID}
            overwriteNextButton={
              <AreYouSureButton
                buttonProps={{}}
                description={
                  "You are about to submit a review. Upon submission of a review, you will lose the ability to edit your review. If you have to edit a review, you will have to contact the coordinator of this unit."
                }
                action={handleSubmit}
              >
                Submit
              </AreYouSureButton>
            }
          ></ReviewerPageBottomNavigation>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReviewerCourseReviewPage4;
