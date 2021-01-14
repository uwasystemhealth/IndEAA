/* 
Some functions may duplicate in the frontend, but this are utilities functions useful for the server
*/

// Get all available roles permissions of a user
export const getAvailablePermissionsOfUser = (permissions) => {
    return new Set(permissions.map(permission => permission.role).sort())
}


export const permissions = ["Administrator", "Coordinator", "Reviewer"]