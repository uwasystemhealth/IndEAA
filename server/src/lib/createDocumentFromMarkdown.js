const pandoc = require('node-pandoc-promise');

const createDocumentFromMarkdown = async (markdownData) => {
    // This function is used for generating word documents with markdown
    // Use https://pandoc.org/MANUAL.html for args
    // About args: https://github.com/asaf050/node-pandoc-promise/issues/4
    try{
        await pandoc(markdownData, '--from markdown -t docx --output ./sample.docx'.split(' '));
        console.info('Success');
    }
    catch(err){
        console.error(`Failed to convert markdown to document: ${err}`);
    }

};

module.exports = createDocumentFromMarkdown;