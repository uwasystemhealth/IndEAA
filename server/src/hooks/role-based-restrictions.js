// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {iff, disallow } = require('feathers-hooks-common');
const { getAvailablePermissionsOfUser} = require('../utils');

// Restricts the service method in to specific role-based permission
// Eg. You want to restrict a method only for Administrator (by default) and Coordinator
// hookNameImported(["Coordinator"])
module.exports = (roleBasedPermissionsRequired) => {
    return iff((context )=> {
        // Allow Service for when the service comes from internal
        if (typeof context.params.provider==='undefined'){

            return false; // Allow service
        }

        const availablePerms = getAvailablePermissionsOfUser(context.params.user.perms);
        
        // Allow Service for Administrator or when the service comes from internal
        if (availablePerms.has('Administrator')){
            return false; // Allow service
        }

        for (let roleRequired of roleBasedPermissionsRequired ){
            // If a user does not have the required permission, then disallow
            if(!availablePerms.has(roleRequired)){
                return true;
            }
        }

        return false; // Allow the service
    } , disallow('external'));
};
