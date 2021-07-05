# Permission
Permission refers to the authority of the user to access or modify information. In business rules, the only reason why a user has to have permission if they need to have access to that information or authority to have action. This means that if a user does not need to access that information, they should not have it.

In IndEAA, this is essential in restricting each of the users to perform only actions that they have permission over. The permission has 2 main elements:

- `role` (what sets of permission does the user have?)
- `course_id` (which `course_evaluation` where this role persists?)


## Relationship to Frontend
Although this part of the documentation applies for both the backend and frontend, this documentation is mainly for backend as it is where most business rules will apply. Permissions for frontend mainly apply only for the convenience of the user, but does not protect certain information or action from being exposed. Hence, all data-driven action (CRUD operations) should be protected by the backend.

## Role

### Administrator
Administrators have the capability to adjust all the permissions of the user in the system, and even has the ability to delete users from the system.

### Coordinator
Coordinators have the capability adjust everything related to the `course_evaluation` and should be able to view details about other coordinators and reviewers of their `course_evaluation`

### Reviewer

Reviewers have the capability to adjust everything related to their own `review` for a `course_evaluation`, and should be able to view details about coordinators for the `course_evaluation` they are assigned to.

## Hooks

### Role-Based Restriction
This hook restricts actions/service methods only to users with a specific role regardless of `course_id`. 

???+ example "Examples of Times where you want this"

    - Admiinistrator Role

    The administrator role does not need `course_id`. Hence, should be used for it

    - Coordinator Role

    Creating a `course_evaluation` requires a Coordinator role, but does not need to check for `course_id`

### Filter-Based Restriction
This hook restricts query (`GET` and `FIND` service methods) to limit (`FIND`) based on query or restricts access (`GET`).

### Role-And-Course Based Restriction
This hook is a stricter version of `Role-Based Restrictions` as this also applies with `course_id` that the user has access to.

???+ example "Example of Times where you want this"
    
    - Multi-Role Coordinator

    A coordinator should not have access to other `course_evaluation` they do not have access on.

    - Multi-Role Reviewer

    A reviewer should not have access to `course_evaluation` they do not have access on, and should also not be able to view `review` that they are not the review person for.

  