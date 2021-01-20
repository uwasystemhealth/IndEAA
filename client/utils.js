import { services } from "store/feathersClient";

// Get all available roles permissions of a user
export const getAvailablePermissionsOfUser = (permissions) => {
    return new Set(permissions.map(permission => permission.role).sort())
}

export const permissions = ["Administrator", "Coordinator", "Reviewer"]

// Icons for Each Different User
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RateReviewIcon from '@material-ui/icons/RateReview';

// Consistent Casing to different Permissions
export const roleIcons = {
    Administrator: SupervisorAccountIcon,
    Reviewer: RateReviewIcon,
    Coordinator: AccountCircleIcon
}

export const getOrCreateReview = async(course_id, reviewer_id) =>{
    const response = await services.review.find({
            query: {
            user_id: reviewer_id,
            course_id
            },
        });
    if(response.value.total<=0){
        services.review.create({
        user_id: reviewer_id,
            course_id
        })
    }
}

export const updateCurrentlyBeingViewedCourse = (course_id) =>{
    services["course-evaluation"].get(course_id)
}

export const reviewSteps = [
    {
      stepName: "Overview & Eoc",
      stepDescription:"This section is a refresher on the review process",
      stepLink: "overview-and-eoc",
    },
    {
      stepName: "Read Documents",
      stepDescription:"This section contains all the documents related in this review. You will see also in the assessment section when reviewing specific EOCs. Please Review the following documents. These should form the basis of your assessment of how this course contributes to the attainment of the Element of Competency outlined in step 1",
      stepLink: "documents",
    },

    {
      stepName: "Review Course",
      stepDescription:"This section contains all the elements of competencies to be assessed. Please click the EOC below to rate and give comment.",
      stepLink: "assessment",
    },

    {
      stepName: "Review & Submit",
      stepDescription:"This section contains the summary of all your responses per section. Please review before submitting.",
      stepLink: "review",
    },

    {
        stepName: "Finish",
        stepDescription:"You have completed submission for this review. See below for your review. If there is something wrong here, please contact the coordinator of this course evaluation",
        stepLink: "finish",
    },
  ];