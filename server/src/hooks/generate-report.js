// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const gatherInformationForCourseEvaluationClosure = require('../utils/generateReport');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
    // Requires `add-service-name` as a hook
        const {app,result,serviceName} = context;
        const gatherInformationForCourseEvaluation =gatherInformationForCourseEvaluation(app);
        
        // Generate the report
        // Do not Await the report generation
        if(serviceName==='course-evaluation'){
            gatherInformationForCourseEvaluation(result._id);
        }
        else if(serviceName==='review'){
            gatherInformationForCourseEvaluation(result.course_id);
        }
        else{
            throw new Error(`Hook has no purpose here. Service Name: ${serviceName}`);
        }

        return context;
    };
};
