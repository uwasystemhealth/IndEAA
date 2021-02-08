// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// This hook will add serviceName in the context
// This is done by identifying and comparing all the services objects (iterated by name) with the context service

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
    return async context => {

        const { service, app } = context;

        for (let serviceName in app.services) {
            if (app.services[serviceName] === service) {
                context.serviceName = serviceName;
                break;
            }
        }

        return context;
    };
};
