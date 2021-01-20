import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerPagePreSubmissionContent from "components/reviewer/ReviewerPagePreSubmissionContent";
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
    if (authUser ) {
      if(reviewState.queryResult.total<=0 || review.course_id !== courseID){
        getOrCreateReview(courseID, authUser._id)
      }
      if(!course || courseID !== course._id)
      {updateCurrentlyBeingViewedCourse(courseID);
      }
    }
  }, [authUser]);

  const handleSubmit = () =>{
    // Do validation to check the previous filled things or find in the page for any danger
  }

  const classes = useStyles();
  const pageNumber = 4;
  return (
    <div>
      {reviewState.isFinished && courseState.isFinished ?(
        <>
          <ReviewProgress review={review}></ReviewProgress>
          <ReviewerPageCardDescription
            pageNumber={pageNumber}
          ></ReviewerPageCardDescription>
          <ReviewerPagePreSubmissionContent></ReviewerPagePreSubmissionContent>
          <ReviewerPageBottomNavigation
            pageNumber={pageNumber}
            course_id={courseID}
            overwriteNextButton ={<>ABC</>}
          ></ReviewerPageBottomNavigation>
        </>
      ):
        <></>
      }
    </div>
  );
};

export default ReviewerCourseReviewPage4;
