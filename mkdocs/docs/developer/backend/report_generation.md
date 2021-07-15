# Report Generation
The report generation feature is used for generating reports for the Coordinators.

## Implementation
The report is generated everytime a new change that has been done for a Course Evaluation (either the details changed or reviews are filled).

???+ info "Node Background Process"
    Report generation for every change normally increases server load. However, it is the easiest implementation. Also, it doesn't affect the performance of the server application as much because it runs as an after hook that is not awaited.

    With Pandoc, the report generation usually takes only a couple of seconds to generate <50 pages.

    ???+ warning "Do not Await!"
        As said, it runs as an after hook that is not awaited so don't put an `await` there.

### Markdown to Word Document Pandoc
The feature is implemented using the package [node-pandoc-promise](https://github.com/asaf050/node-pandoc-promise).

???+ info "Requirement: Pandoc"
    This package requires installation of node-pandoc. You can easily install it by typing `apt-get install pandoc` (this is sadly not documented in the original documentation)

### Access from Frontend
The server application uses the `/public/documents` path to store the generated report. This storage is for the purpose of easily acceessing reports from the frontend.

???+ info "Security"
    As of the implementation of the feature, the security authentication is not established.

    Currently, it is deemed secure enough because to access a file, the user/application will need the **exact** path of the file  they want to access. The format will be in `public/documents/${course_id}/IndEAA-Report-{courseCode}`. The hardest bit here to guess is the `course_id` because that refers to the MongoDB Object ID. Guessing this will probably be almost the same thing as trying to guess the JWT authentication token.