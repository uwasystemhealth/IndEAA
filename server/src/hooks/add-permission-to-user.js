// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
// This hook is used for adding permission to user on create of a course
module.exports = (options = {}) => {
    return async context => {
        const {app} = context;
        const {user} = context.params;
        const course = context.result;

        // Add Coordinator Permission to User
        const permissionToGive = {
            course_id: course._id,
            role: 'Coordinator'
        };
        await app.service('users').patch(user._id,{
            $push: { perms: permissionToGive },
        });

        return context;
    };
};
