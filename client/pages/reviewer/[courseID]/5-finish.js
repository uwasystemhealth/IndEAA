import { useRouter } from "next/router"

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const ReviewerCourseReviewPage5 = () => {
    const router = useRouter()
    const { courseID } = router.query

    const classes = useStyles();
    return (
        <div >
            {courseID}
            ReviewerCourseReviewPage5
        </div>
    )
}

export default ReviewerCourseReviewPage5
