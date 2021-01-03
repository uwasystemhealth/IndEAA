// This hooks run to add admin permission to the first user created

const userModelConstructor = require("../models/users.model")

module.exports = function (options = {}) {
  return async context => {
    const { app } = context
    const userModel = userModelConstructor(app)
    const totalUserCounts = await userModel.countDocuments({})
    if (totalUserCounts == 0) { // Count User Created
      //First user will have a Admin permission
      context.data.perms = [{ course_id: null, role: "Administrator" }]
    }
    return context;
  }
}
