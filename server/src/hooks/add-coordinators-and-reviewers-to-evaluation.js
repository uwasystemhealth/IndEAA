// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// This hook is used for adding more information about the course-evaluation endpoint
// This is an After Hook
const errors = require('@feathersjs/errors');
const getUsersForRoleClosure = require('../utils/feathersStuff');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
    return async context => {
        const {app, id,method} = context;

        const getUsersForRole = getUsersForRoleClosure(app);

        if(method!=='find'){ // All Services except find
            const [coordinators,reviewers] = await Promise.all([getUsersForRole(id,'Coordinator'),getUsersForRole(id,'Reviewer')]);
            context.result.coordinators = coordinators;
            context.result.reviewers = reviewers;
        }
        else{
            context.result.data = await Promise.all(context.result.data.map(async(datum)=>{
                const [coordinators,reviewers] = await Promise.all([getUsersForRole(datum._id,'Coordinator'),getUsersForRole(datum._id,'Reviewer')]);
                return({
                    ...datum,
                    coordinators,
                    reviewers
                });
            }));
        }
    };
};
