// review-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const DefaultSchema = require('../types/default.schema');
const DescType = require('../types/desc.type');
const ObjectIdType = require('../types/objectId.type');


module.exports = function (app) {
    const modelName = 'review';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient; // Mongoose Schema Constructor
    const schema = DefaultSchema(app);

    schema.add({
        user_id: ObjectIdType('users',app) ,
        course_id: ObjectIdType('course-evaluation', app),
        step1DevelopmentLevels: {type: Boolean, default:false},
        step2Documents: [
            {
                document_id:Schema.Types.ObjectId,
                comment: DescType(),
                finishedReviewedOn: {type: Date, default: null}
            }
        ],
        step3Evaluation:[
            {
                rating: Number,
                reason: DescType(),
                ideaForImprovement: DescType(),
                eoc: {type: String}
            }
        ],
        step4ReviewComment: DescType(),
        isSubmitted: {type: Boolean, default: false}
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};
