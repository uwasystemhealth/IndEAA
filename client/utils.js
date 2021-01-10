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