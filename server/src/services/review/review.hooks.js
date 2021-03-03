const { authenticate } = require('@feathersjs/authentication').hooks;
const {iff, disallow } = require('feathers-hooks-common');
const filterBasedPermission = require('../../hooks/filter-based-permission');
const roleAndCourseBasedRestrictions = require('../../hooks/role-and-course-based-restrictions');


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
        create: [],
        update: [],
        patch: [],
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
