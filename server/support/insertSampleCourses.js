/*
This is a support file that is used to insert sample courses to the database
This is comparable to Djang Management Commands Scripts
*/

const app = require('../src/app');

const insertSampleCourses = async () => {
    console.log("Starting: insertSampleCourses")
    data = [
        {
            courseId: "CITS1001",
            documents: [
                { name: "Sample Document", link: "https://www.google.com", tags: ["1", "1.1"] }
            ],
            reviewDescription: "Sample Description",
            reviewTargetDate: "10/10/2021",
            isArchived: false,
            createdAt: "1/1/2021",
            createdBy: {},
            eoc: [
                { eocNumber: ["1.1", "1.2", "1.3"], justification: "Sample Justification" }
            ],
        },
        {
            courseId: "MECH1001",
            documents: [
                { name: "Sample Document", link: "https://www.google.com", tags: ["1", "1.1"] }
            ],
            reviewDescription: "Sample Description",
            reviewTargetDate: "10/10/2021",
            isArchived: false,
            createdAt: "1/1/2021",
            createdBy: {},
            eoc: [
                { eocNumber: ["1.1", "1.2", "1.3"], justification: "Sample Justification" }
            ],
        },
        {
            courseId: "ELEC1001",
            documents: [
                { name: "Sample Document", link: "https://www.google.com", tags: ["1", "1.1"] }
            ],
            reviewDescription: "Sample Description",
            reviewTargetDate: "10/10/2021",
            isArchived: false,
            createdAt: "1/1/2021",
            createdBy: {},
            eoc: [
                { eocNumber: ["1.1", "1.2", "1.3"], justification: "Sample Justification" }
            ],
        }
    ]
    const promises = data.map(datum => {
        return app.service("course-evaluation").create(datum)
    })
    await Promise.all(promises)
    console.log("Done")
}

insertSampleCourses()