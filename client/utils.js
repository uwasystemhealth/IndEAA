import { services } from "store/feathersClient";

// Get all available roles permissions of a user
export const getAvailablePermissionsOfUser = (permissions) => {
    return new Set(permissions.map(permission => permission.role).sort())
}

export const permissions = ["Administrator", "Coordinator", "Reviewer"]

// Icons for Each Different User
import Placeholder from "@material-ui/icons/Mood";

// Consistent Casing to different Permissions
export const roleIcons = {
    Administrator: Placeholder,
    Reviewer: Placeholder,
    Coordinator: Placeholder
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