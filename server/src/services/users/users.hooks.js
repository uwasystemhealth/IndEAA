const { authenticate } = require('@feathersjs/authentication').hooks;
const firstUser = require("../../hooks/firstUser")
const compileGoogleAndSystemPerms = require("../../hooks/compileGoogleAndSystemPerms")


module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [firstUser(), compileGoogleAndSystemPerms()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
    ],
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
