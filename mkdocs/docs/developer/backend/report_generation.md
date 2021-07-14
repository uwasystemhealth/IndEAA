# Report Generation
The report generation feature is used for generating reports for the Coordinators.

## Implementation

### Markdown to Word Document Pandoc
The feature is implemented using the package [node-pandoc-promise](https://github.com/asaf050/node-pandoc-promise).

???+ info "Requirement: Pandoc"
    This package requires installation of node-pandoc. You can easily install it by typing `apt-get install pandoc` (this is sadly not documented in the original documentation)

### Access from Frontend
The server application uses the `/public/documents` path to store the generated report. This storage is for the purpose of easily acceessing reports from the frontend.

???+ info "Security"
    As of the implementation of the feature, the security authentication is not established.

    Currently, it is deemed secure enough because to access a file, the user/application will need the **exact** name of the file  they want to access. The format will be in `IndEAA-${course_id}-{courseCode}`. The hardest bit here to guess is the `course_id` because that refers to the MongoDB Object ID. Guessing this will probably be almost the same thing as trying to guess the JWT authentication token.