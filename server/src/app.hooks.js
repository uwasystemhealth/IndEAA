// Application hooks that run for every service

const log = require('./hooks/log');
const addServiceName = require('./hooks/add-service-name');
const modifiedBy = require('./hooks/modified-by');
const existingContext = require('./hooks/existing-context');


module.exports = {
    before: {
        all: [log(), addServiceName()],
        find: [],
        get: [],
        create: [modifiedBy()],
        update: [existingContext(), modifiedBy()],
        patch: [existingContext(), modifiedBy()],
        remove: [existingContext()]
    },

    after: {
        all: [log()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [log()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
