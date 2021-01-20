// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// This hook is used for creating an "existing" field in the context to be modified
// This tries to get the existing item

const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
    return async context => {
        const {app, id, params, serviceName} = context;
        if(serviceName === 'authentication') return context;
        context.existing = await app.service(serviceName).get(id);
        if(!context.existing) throw new errors.NotFound('Id provided does not exist.');

        if(context.data && !params.overrideSafeRemove) context.data.enabled = context.existing.enabled;
        return context;
    };
};
