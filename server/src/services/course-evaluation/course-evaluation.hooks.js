const { authenticate } = require('@feathersjs/authentication').hooks;
const filterBasedPermission = require('../../hooks/filter-based-permission');

const addCoordinatorsAndReviewersToEvaluation = require('../../hooks/add-coordinators-and-reviewers-to-evaluation');
const addPermissionToUser = require('../../hooks/add-permission-to-user');

module.exports = {
    before: {
        all: [ authenticate('jwt') ],
        find: [filterBasedPermission()],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [addCoordinatorsAndReviewersToEvaluation()],
        find: [],
        get: [],
        create: [addPermissionToUser()],
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
