const { authenticate } = require('@feathersjs/authentication').hooks;
const {iff, disallow } = require('feathers-hooks-common');
const filterBasedPermission = require('../../hooks/filter-based-permission');

const roleBasedRestrictions = require('../../hooks/role-based-restrictions');
const roleAndCourseBasedRestrictions = require('../../hooks/role-and-course-based-restrictions');
const addCoordinatorsAndReviewersToEvaluation = require('../../hooks/add-coordinators-and-reviewers-to-evaluation');
const addPermissionToUser = require('../../hooks/add-permission-to-user');

const generateReport = require('../../hooks/generate-report');

module.exports = {
    before: {
        all: [ authenticate('jwt') ],
        find: [filterBasedPermission()],
        get: [filterBasedPermission()],
        create: [ roleBasedRestrictions(['Coordinator'])], // Only create for a coordinator
        update: [ roleAndCourseBasedRestrictions()], // Only modifications of a specific unit
        patch: [ roleAndCourseBasedRestrictions()], // is allowed for a the coordinator of that specific unit
        remove: [disallow('external')] // Prevent any removal of Course-Evaluation
    },

    after: {
        all: [addCoordinatorsAndReviewersToEvaluation()],
        find: [],
        get: [],
        create: [addPermissionToUser(), generateReport()],
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
