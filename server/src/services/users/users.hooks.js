const { authenticate } = require('@feathersjs/authentication').hooks;
const firstUser = require('../../hooks/firstUser');
const attachUser = require('../../hooks/attach-user');
const roleBasedRestrictions = require('../../hooks/role-based-restrictions');
const compileGoogleAndSystemPerms = require('../../hooks/compileGoogleAndSystemPerms');


module.exports = {
    before: {
        all: [],
        find: [authenticate('jwt'),
            roleBasedRestrictions(['Coordinator'])
        ],
        get: [authenticate('jwt')],
        create: [firstUser(), compileGoogleAndSystemPerms()],
        update: [authenticate('jwt'), roleBasedRestrictions(['Administrator'])], // Only Admin
        patch: [authenticate('jwt'), roleBasedRestrictions(['Coordinator'])], // Only Coordinator + Admin
        remove: [authenticate('jwt'), roleBasedRestrictions(['Administrator'])], // Only Admin
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
