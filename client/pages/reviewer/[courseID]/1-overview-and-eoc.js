import {useEffect} from "react"
import { useRouter } from "next/router"

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress"

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const ReviewerCourseReviewPage1 = () => {
    const router = useRouter()
    const { courseID } = router.query

    const reviewState = useSelector(state => state.review)
    const review = reviewState.queryResult.data[0] || {course_id:courseID}
    const authUser = useSelector((state) => state.auth.user);

    // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
    // If it cannot find it, then create it
    // Executes on Component Remount (after auth user is fetched)
    useEffect(() => {
        const getOrCreateReview = async() =>{
            if (review && review.course_id !== courseID) {
                const response = await services.review.find({
                        query: {
                        user_id: authUser._id,
                        course_id:courseID
                        },
                    });
                if(response.value.total<=0){
                    services.review.create({
                        user_id: authUser._id,
                        course_id:courseID
                    })
                }
            }
        }
        // Only Call when authUser is now defined
        if(authUser){
            getOrCreateReview()
        }
        
    }, [authUser]);

    const classes = useStyles();
    return (
        <div >
            <ReviewProgress review={review}></ReviewProgress>
        </div>
    )
}

export default ReviewerCourseReviewPage1
