// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const userModelConstructor = require('../models/users.model');

// This hook will attach the authenticated user to the context (on authentication)
// This is only useful for authentication aside from JWT
// Access with context.params.user
module.exports = (options = {}) => {
    return async context => {
        const userModel = userModelConstructor(context.app);
        if(context.params.authStrategies && context.params.authStrategies.includes('google'))
        {
            const googleId = context.params.query.googleId;
            context.params.user = (await userModel.findOne({googleId}))._doc;
        }

        return context;
    };
};
