const {Schema} = require('mongoose');
const _ = require('lodash');

module.exports = (field, app, opts = { required: true } ) => ({
  type: Schema.Types.ObjectId,
  validate: async function(v){
    try {
      const service = _.get(this, field);
      if(!service) throw new Error(`service name not specified. \n${Object.keys(this)}`);
      if(!v) throw new Error(`${service} reference is required.`);
      const row = await app.service(service).get(v);
      if(!row) throw new Error(`${service} reference does not exist.`);
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
  },
  ...opts,
});