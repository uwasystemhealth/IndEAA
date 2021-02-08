const { authenticate } = require('@feathersjs/authentication').hooks;
const filterBasedPermission = require('../../hooks/filter-based-permission');

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
