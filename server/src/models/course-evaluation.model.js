// courseEvaluation-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const DefaultSchema = require('../types/default.schema');
const NameType = require('../types/name.type');
const DescType = require('../types/desc.type');
const LinkType = require("../types/link.type")

const ObjectIdType = require('../types/objectId.type');

module.exports = function (app) {
  const modelName = 'courseEvaluation';
  const mongooseClient = app.get('mongooseClient');
  const schema = DefaultSchema(app)

  schema.add({
    courseId: NameType(),
    documents: [{
      name: NameType(),
      description: DescType(),
      // TODO UPLOADED FILES - Stage 2
      link: LinkType(),
      tags: [{ type: 'String' }]
    }],
    reviewDescription: DescType(),
    isArchived: Boolean,
    completedDate: Date,
    eoc: [{
      eocNumber: [String],
      developmentLevel: {type: Number},
      justification: DescType()
    }]
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
