const pandoc = require('node-pandoc-promise');

const createDocumentFromMarkdown = async (markdownData,filename) => {
    // This function is used for generating word documents with markdown
    // Use https://pandoc.org/MANUAL.html for args
    // About args format: https://github.com/asaf050/node-pandoc-promise/issues/4
    try{
        const filePath = `public/documents/${filename}.docx`;
        await pandoc(markdownData, `--from markdown -t docx --output ${filePath}`.split(' '));
        console.info(`Document Generation is Successful: ${filePath}`);
    }
    catch(err){
        console.error(`Failed to convert markdown to document: ${err}`);
    }

};

module.exports = createDocumentFromMarkdown;