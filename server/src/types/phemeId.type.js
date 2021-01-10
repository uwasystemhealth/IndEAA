//pheme username
module.exports = (required=[true, 'Pheme number is required.'], opts) => ({ 
  type: String,
  required,
  match: [/^\d{8}$/, 'Invalid Pheme number provided'],
  ...opts
});