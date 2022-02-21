const { authenticate } = require('@feathersjs/authentication').hooks;
const {iff, disallow } = require('feathers-hooks-common');
const filterBasedPermission = require('../../hooks/filter-based-permission');
const roleAndCourseBasedRestrictions = require('../../hooks/role-and-course-based-restrictions');


const generateReport = require('../../hooks/generate-report');


module.exports = {
    before: {
        all: [ authenticate('jwt') ],
        find: [filterBasedPermission()],
        get: [filterBasedPermission()],
        create: [roleAndCourseBasedRestrictions()], // Creation and modificaiton of review
        update: [roleAndCourseBasedRestrictions()], // is only allowed for the author/reviewer
        patch: [roleAndCourseBasedRestrictions()],
        remove: [disallow('external')]
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [generateReport()],
        update: [generateReport()],
        patch: [generateReport()],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
