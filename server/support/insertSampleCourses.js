/*
This is a support file that is used to insert sample courses to the database
This is comparable to Djang Management Commands Scripts
*/

const app = require("../src/app");

const insertSampleCourses = async () => {
    console.log("Starting: insertSampleCourses");
    data = [
        {
            courseId: 'CITS1001',
            documents: [
                {
                    name: "Sample Document",
                    link: "https://www.google.com",
                    tags: ["1", "1.1"],
                },
            ],
            reviewDescription: 'Sample Description',
            reviewTargetDate: '10/10/2021',
            isArchived: false,
            dueDate: "3/3/2021",
            createdAt: "1/1/2021",
            createdBy: {},
            eoc: [
                {
                    eocNumber: ["1.1", "1.2", "1.3"],
                    justification: "Sample Justification",
                },
            ],

            documents: [
                {
                    name: "Design Project Outline",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
                {
                    name: "RTIO Project - J Slack Something blah blah",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1.1"],
                },
                {
                    name: "Design Project Outline",
                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
            ],
        },
        {
            courseId: 'MECH1001',
            documents: [
                {
                    name: "Sample Document",
                    link: "https://www.google.com",
                    tags: ["1", "1.1"],
                },
            ],
            reviewDescription: 'Sample Description',
            reviewTargetDate: '10/10/2021',
            isArchived: false,
            createdAt: "1/1/2021",
            dueDate: "3/3/2021",
            createdBy: {},
            eoc: [
                {
                    eocNumber: ["1.1", "1.2", "1.3"],
                    justification: "Sample Justification",
                },
            ],

            documents: [
                {
                    name: "Design Project Outline",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
                {
                    name: "RTIO Project - J Slack Something blah blah",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1.1"],
                },
                {
                    name: "Design Project Outline",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
            ],
        },
        {
            courseId: 'ELEC1001',
            documents: [
                {
                    name: "Sample Document",
                    link: "https://www.google.com",
                    tags: ["1", "1.1"],
                },
            ],
            reviewDescription: 'Sample Description',
            reviewTargetDate: '10/10/2021',
            isArchived: false,
            dueDate: "3/3/2021",
            createdAt: "1/1/2021",
            createdBy: {},
            eoc: [
                {
                    eocNumber: ["1.1", "1.2", "1.3"],
                    justification: "Sample Justification",
                },
            ],

            documents: [
                {
                    name: "Design Project Outline",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
                {
                    name: "RTIO Project - J Slack Something blah blah",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1.1"],
                },
                {
                    name: "Design Project Outline",

                    added: new Date("2019-12-19"),
                    description:
                        "a great project, llorenm ipsum dolar sit ametlorenm ipsum dolar sit ametlorenm ipsum dolar sit amet orenm ipsum dolar sit amet",
                    link:
                        "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
                    tags: ["1", "2", "3"],
                },
            ],
        },
    ];
    const promises = data.map((datum) => {
        return app.service("course-evaluation").create(datum);
    });
    await Promise.all(promises);
    console.log("Done");
};

insertSampleCourses();
