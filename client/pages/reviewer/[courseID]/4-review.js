import { useRouter } from "next/router"

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

const ReviewerCourseReviewPage4 = () => {
    const router = useRouter()
    const { courseID } = router.query

    const classes = useStyles();
    return (
        <div >
            {courseID}
            ReviewerCourseReviewPage4
        </div>
    )
}

export default ReviewerCourseReviewPage4
