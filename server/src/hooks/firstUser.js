// This hooks run to add admin permission to the first user created

module.exports = function (options = {}) {
    return async context => {
        const { app } = context;
        const totalUserCounts = (await app.service('users').find({ query: { $limit: 0 } })).total;
        if (totalUserCounts == 0) { // Count User Created
            //First user will have a Admin permission
            context.data.perms = [{ course_id: null, role: 'Administrator' }];
        }
        return context;
    };
};
