module.exports = (required=true, opts={}) => ({
  type: [{
    type: String,
    match: [/^([\w*-^!@#$/]){1,96}$/, 'Invalid permission node "{VALUE}" provided.'],
  }],
  set: v => typeof v === 'string' ? v.split('.') : v, 
  required,
  ...opts,
});
