module.exports = (opts,required=[true, 'An email is required.']) => ({
  type: String,
  required,
  match: [/^.+@.+[.].+$/, 'Invalid email provided.'],
  trim: true,
  lowercase: true,
  maxLength: [320, 'An email address cannot exceed 320 characters in length'],
  ...opts
});