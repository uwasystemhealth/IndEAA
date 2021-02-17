// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');
const { getAvailablePermissionsOfUser} = require('../utils');


// Filters search results based on the role that is applied
// should be used as an after hook
/*
  For every unit in the search list, determine whether a person is either a
  coordinator or a reviewer of that unit

  For every review in the search list, determine whether a person is either a 
  coordinator or the owner of that review
*/
module.exports = (options = {}) => {
    return async context => {
        const {serviceName,params,method, id} = context;

        // No filter in internal server use
        if (typeof params.provider!=='undefined'){
            const {user} = params;
          
            const availablePerms = getAvailablePermissionsOfUser(user.perms);

            // No for Administrator or when the service comes from internal
            if (!availablePerms.has('Administrator')){
                // Get the IDs of the courses that belongs to either coordinator or reviewer
                const coordinatorCoursePermissions = user.perms.filter( perm => 
                    perm.role==='Coordinator'
                ).map(perm => perm.course_id);
                const reviewerCoursePermissions = user.perms.filter(perm=>
                    perm.role==='Reviewer').map(perm => perm.course_id);

                if(serviceName==='course-evaluation')
                { 
                    // Convert to set to eliminate redundancies
                    const courseIDsAllowed = Array.from(new Set(coordinatorCoursePermissions.concat(reviewerCoursePermissions)));
                    const courseIDsAllowedStringCasted = courseIDsAllowed.map(course_id => String(course_id));
                    if(method==='get' && !courseIDsAllowedStringCasted.includes(id)){
                        throw new Forbidden('You do not have the correct permission to access this');
                    }
                    params.query = {...params.query, _id: {$in: courseIDsAllowed} };
                }
                else if(serviceName==='review'){
                    // TODO: Create a permission filter for a review
                    params.query={
                        ...params.query,
                        $or: [
                            {course_id: {$in: coordinatorCoursePermissions}},
                            {user_id: user._id },
                        ]
                    };
                }
            }
        }
        return context;
    };
};
