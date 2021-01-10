module.exports = (ref, app, required = true) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  return {
    type: Schema.Types.ObjectId,
    ref,
    required,
    validate: async function(v){
      if(!v && required) throw new Error(`${ref} reference is required.`);
      else if(!v) return;
      const row = await app.service(ref).get(v);
      if(!row) throw new Error(`${ref} reference does not exist.`);
      this[`__ref_${ref}`] = row;
    },
  };
};
