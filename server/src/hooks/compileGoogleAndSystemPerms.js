/*
If a user has been created without login in through the google oauth
This must mean that the user has been created permissions without being in the system
This hook is to compile google OpenConnect ID with System Permission
*/
module.exports = function (options = {}) {
    return async context => {
        // Get Email of Current User
        const { email } = context.data

        // Try to find if the email already exist in the system
        const { app } = context
        const queryResult = await app.service("users").find({ query: { $limit: 1, email } })
        console.log(queryResult)

        if (queryResult.total > 0) {
            const existingUser = queryResult.data[0]
            context.data.perms = existingUser.perms
            // DELETE OPERATION are usually destructive
            // In this case, the user in the system is unlikely to have done
            // without google access
            await app.service("users").remove(existingUser._id)
        }

        return context;
    }
}