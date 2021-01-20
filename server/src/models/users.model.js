// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const DefaultSchema = require('../types/default.schema');
const NameType = require('../types/name.type');
const EmailType = require('../types/email.type');
const ObjectIdType = require('../types/objectId.type');


module.exports = function (app) {
    const modelName = 'users';
    const mongooseClient = app.get('mongooseClient');
    const schema = DefaultSchema(app);

    schema.add({
        googleId: { type: String },
        name: NameType(required = false),
        picture: { type: String },
        email: EmailType({ unique: true }),
        perms: [
            {
                course_id: ObjectIdType('course-evaluation', app, required = false),
                role: { type: String, enum: ['Administrator', 'Coordinator', 'Reviewer'], required: true },
            }
        ]
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};
