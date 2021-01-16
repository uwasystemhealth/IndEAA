// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {iff, disallow } = require('feathers-hooks-common');
const { getAvailablePermissionsOfUser} = require('../utils');

// Restricts the service method in to specific role-based permission and course-based
// Eg. You want to restrict a method only for Administrator (by default) and Coordinator
module.exports = () => {
    return iff((context )=> {
        const {params,serviceName} = context;

        // Allow Service for when the service comes from internal
        if (typeof context.params.provider==='undefined'){
            return false; // Allow service
        }

        const availableRoles = getAvailablePermissionsOfUser(params.user.perms);

        // Allow Service for Administrator or when the service comes from internal
        if (availableRoles.has('Administrator')){
            return false; // Allow service
        }

        if(serviceName==='review'){ // This is for review service
            // Get course id
            const course_id = context.data.course_id || context.existing.course_id;

            // If the service is a review, then the user needs to have a Reviewer role
            if (!params.user.perms.includes({course_id,role:'Reviewer'})){
                return true;
            }
        }

        if(serviceName ==='course-evaluation'){
            // Get course id
            const course_id = context.data._id || context.existing._id;

            // If the service is a course-evaluation role
            if (!params.user.perms.includes({course_id,role:'Coordinator'})){
                return true;
            }
        }

        return false; // Allow the service
    } , disallow('external'));
};
