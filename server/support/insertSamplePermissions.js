/*
This is a support file that is used to insert sample courses to the database
This is comparable to Django Management Commands Scripts
*/

const app = require('../src/app');

// Requires:
// InsertSampleCourses to be run before
const insertSamplePermissions = async () => {
    console.log('Starting: insertSamplePermissions');
    const course  = await app.service('course-evaluation').find({
        query:{
            courseId: 'CITS1001' // Unit id
        }
    });
    const data = [
        { // Coordinator for Sample Permissions
            googleId: '3',
            name: 'testUser3',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            email:'testUser3@gmail.com',
            perms:[{  course_id:null,
                role: 'Coordinator'}]
        },
        { // Reviewer for Sample Permissions
            googleId: '4',
            name: 'testUser4',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            email:'testUser4@gmail.com',
            perms:[{  course_id:null,
                role: 'Reviewer'}]
        },
    ];

    const promises = data.map(datum => {
        datum.perms = datum.perms.map(({role})=>
            ({role,course_id:course._id})
        );
        return app.service('users').create(datum);
    });
    await Promise.all(promises);

    console.log('Done');
};

insertSamplePermissions();