import { useEffect } from "react";
import { useRouter } from "next/router";

// CORE COMPONENTS
import Button from "components/MaterialKit/CustomButtons/Button.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerPageBottomNavigation from "components/reviewer/ReviewerPageBottomNavigation";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

import { getOrCreateReview } from "utils";

const ReviewerCourseReviewPage1 = () => {
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
    if (authUser && review && review.course_id !== courseID) {
      getOrCreateReview(courseID, authUser._id);
    }
  }, [authUser]);

  const classes = useStyles();
  return (
    <div>
      <ReviewProgress review={review}></ReviewProgress>
      <ReviewerPageBottomNavigation
        pageNumber={1}
        course_id={courseID}
      ></ReviewerPageBottomNavigation>
    </div>
  );
};

export default ReviewerCourseReviewPage1;
