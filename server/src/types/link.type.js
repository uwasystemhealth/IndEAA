module.exports = (required=false, maxLengthSize=1024) => ({
    type: String,
    maxLength: [maxLengthSize, 'link is too long, try a url shortener.'],
    match: [/https?:\/\/[\w-]+\.[\w-]+((\?|\/|#).*)?/, 'Invalid link provided.'],
    required
});
