const pandoc = require('node-pandoc-promise');
const fs = require('fs'); // NodeJS Filestreams

const cleanName = (name) =>{
    // This function is used to sanitise a name that is appropriate for filenames
    // Reference: https://stackoverflow.com/questions/3881297/regexp-for-clean-file-and-folder-names
    name = name.replace(/\s+/gi, '-'); // Replace white space with dash
    name = name.replace(/[^a-zA-Z0-9\-]/gi, ''); // Strip any special charactere
    return name;
}; 

const createDocumentFromMarkdown = async (markdownData,filename,folderPath) => {
    // This function is used for generating word documents with markdown
    // Use https://pandoc.org/MANUAL.html for args
    // About args format: https://github.com/asaf050/node-pandoc-promise/issues/4
    try{
        const filePath = `public/documents/${folderPath}`;
        // Pandoc can only create file when directory to hold file exist
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(filePath);
        }
        const cleanFileName = cleanName(filename);
        const destination = `${filePath}/${cleanFileName}.docx`;
        await pandoc(markdownData, `--from markdown -t docx --output ${destination} --toc`.split(' '));
        console.info(`Document Generation is Successful: ${destination}`);
    }
    catch(err){
        console.error(`Failed to convert markdown to document: ${err}`);
    }

};

module.exports = createDocumentFromMarkdown;