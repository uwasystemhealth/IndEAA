// Get all available roles permissions of a user
export const getAvailablePermissionsOfUser = (permissions) => {
    return new Set(permissions.map((permission) => permission.role).sort());
};

export const permissions = ['Administrator', 'Coordinator', 'Reviewer'];

// Icons for Each Different User
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RateReviewIcon from '@material-ui/icons/RateReview';

// Consistent Casing to different Permissions
export const roleIcons = {
    Administrator: SupervisorAccountIcon,
    Reviewer: RateReviewIcon,
    Coordinator: AccountCircleIcon
};
