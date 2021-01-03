// Get all available permission of a user
export const getAvailablePermissionsOfUser = (permissions)=>{
    return new Set(permissions.map(permission => permission.role))
}