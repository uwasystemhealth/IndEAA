# Services
Services refers to endpoints of the backend that interfaces directly with the database and may have relations to other service (as opposed to microservices).

See below for the services that IndEAA has.

## Users `/users`
This is responsible for data-driven actions related to users.

## Course Evaluation`/course_evaluation`
This is responsible for data-driven actions related to course that is being evaluated.

### Metadata
This service has two metadata field that are not mapped in the model.

### `coordinators`

This is an array of users object that has a permission `course_id` for this `course_evaluation` and `role` as "Coordinator. The object has these following fields:

- `_id`
- `name`
- `email`

### `reviewers`
This is an array of users object that has a permission `course_id` for this `course_evaluation` and `role` as "Reviewer". The object has the same following fields as `coordinators` object structure.

???+ note "Model != Service"
    There is some difference to a service to a model field, hence should not be relied upon if deciding on which endpoint to use.

## Review `/review`
This is responsible for data-driven actions related to reviews for a specific course.