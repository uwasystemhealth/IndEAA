/*
This is a support file that is used to insert sample courses to the database
This is comparable to Django Management Commands Scripts
*/

const app = require('../src/app');

// Requires:
// InsertSampleCourses to be run before
// InsertSamplePermissions to be run before
const insertSampleReview = async () => {
    console.log('Starting: insertSampleReview');
    const course  = (await app.service('course-evaluation').find({
        query:{
            courseId: 'CITS1001' // Unit id
        }
    })).data[0];
    console.log(course);

    const reviewer = await(app.service('users').find({
        query:{
            googleId: '4'
        }
    }));

    const data = [
        { // Review
            user_id: reviewer.data[0]._id,
            course_id: course._id,
            step1DevelopmentLevels: true,
            step2Documents: [
            ],
            step3Evaluation:[
                {
                    eoc: '1.1',
                    rating: '4',
                    reason:'Sample Reason',
                    ideaForImprovement:'Sample idea'
                }
            ],
            step4ReviewComment: 'Sample Review Comment',
            isSubmitted: true
        }
    ];

    const promises = data.map(datum => {
        return app.service('review').create(datum);
    });
    await Promise.all(promises);

    console.log('Done');
};

insertSampleReview();