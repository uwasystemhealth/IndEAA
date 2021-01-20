/*
This is a support file that is used to insert sample courses to the database
This is comparable to Djang Management Commands Scripts
*/

const app = require('../src/app');

const insertSampleUsers = async () => {
    console.log('Starting: insertSampleUsers');
    const data = [
        { // Administrator for Sample Permissions
            googleId: '1',
            name: 'testUser1',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            email:'testUser1@gmail.com',
            perms:[{  course_id:null,
                role: 'Administrator'}]
        },
        { // General Coordinator for Sample Permissions
            googleId: '2',
            name: 'testUser2',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            email:'testUser2@gmail.com',
            perms:[{  course_id:null,
                role: 'Coordinator'}]
        },

    ];
    const promises = data.map(datum => {
        return app.service('users').create(datum);
    });
    await Promise.all(promises);
    console.log('Done');
};

insertSampleUsers();