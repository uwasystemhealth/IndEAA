# Coding Standards
The IndEAA is bootstrapped by two developers working remotely. Along with the development, due to the difference of coding standards and background, this documentation has been established for better communication while working remotely.

???+ info "Leniency"
    This coding standard is established for the purpose of more fluid communication. However, this is followed for the usual governance of the codebase, but can be overruled given a reason.


## Import Order

It is important to have an order of import for code readability. There is a specific order of package, and if in the same category, it is arranged alphabetically. Each category is divided a space.

### Frontend Import Order
The order is:

1. React + Redux + Functionality Imports
2. Own Components Import
3. Utilities Import
3. Material Kit import
4. Material Ui Import
5. Icons
6. Styles Import (both Material UI usestyles, style imports and style definition)

??? info "Absolute Import"
    It is recommended to use absolute import as it makes it easier to compare source code file imports. The frontend is configured to use absolute import from the root folder `client`. This is not the same for `server` at the moment.

???+ example "Frontend Import Order Example"
    ```js
    // This is reordered of administrator/index.js

    import { useEffect, useState } from "react"
    import { useDispatch, useSelector } from "react-redux"
    import { services } from "store/feathersClient"

    // Own Components
    import UserModal from "components/administrator/UserModal"
    import CreateUserModal from "components/administrator/CreateUserModal"

    // Helper
    import { getAvailablePermissionsOfUser, roleIcons } from "utils"

    // Material Kit
    import Card from "components/MaterialKit/Card/Card.js";
    import CardBody from "components/MaterialKit/Card/CardBody.js";
    import CardHeader from "components/MaterialKit/Card/CardHeader.js";
    import Button from "components/MaterialKit/CustomButtons/Button.js";
    import Grid from "components/MaterialKit/Grid/GridContainer.js";
    import GridItem from "components/MaterialKit/Grid/GridItem.js";

    // Material UI
    import Tooltip from "@material-ui/core/Tooltip";

    // Icons
    import Placeholder from "@material-ui/icons/Mood";

    //Styles
    import { makeStyles } from "@material-ui/core/styles";
    import styles from "assets/jss/nextjs-material-kit/pages/landingPage";
    const useStyles = makeStyles(styles);
    ```

### Backend Import Order
The order is:

1. NPM imports
2. Project Imports


## Naming of Variables, Files and Database
This is no different to usual coding standards, but it is worth noting to put name of variable as sensible names.

### General

### Consistent Variable Names
Consistency of variable names for variables that refers to the same property, but different context.

???+ example "Data from the store and data from the form state"
    === "Good"

        ``` js
         useEffect(() => {
            setCourseId(courseData?.courseId || '');
            setReviewDescription(courseData?.reviewDescription || '' );
            setDueDate(courseData?.dueDate || '');
        }, [courseData]);
        ```

    === "Another Good one"
        This uses a single `formState` instead of separating.
        ``` js
         useEffect(() => {
            setFormState({
                courseId: courseData?.courseId || '',
                reviewDescription: courseData?.reviewDescription || '',
                dueDate: courseData?.dueDate || '',
            })
        }, [courseData]);
        ```

    === "Bad"

        ``` js
         useEffect(() => {
            setCode(courseData?.courseId || '');
            setDescription(courseData?.reviewDescription || '' );
            setDueDate(courseData?.dueDate || '');
        }, [courseData]);
        ```
    This is part of the Evaluation Modal where a form state is declared and initialised with values from the data store.

If you look at the bad example, you will notice these:
- what is the difference of terminology between `code` and `courseId`
- between `description` and `reviewDescription`, there isn't that much of a problem. However, that begs the question, why change the first terminology in the first place?
  - the advantage that you get if you don't change terminology is that you can use the usual JavaScript `...` operator due to same name.

If you see a bad naming, but is consistent, you have 2 choices:
- replace the entire reference of the bad name
- use the bad name, and replace it later with find and replace.

This is the main power of being consistent is that you can always tie it to other references, although with different naming, you still can but you have to do it manually.

### Consistent File Naming
Make sure that the name of the default function is the same name as the filename. If it is not the same name, have a good reason.

???+ Example "Filename consistency"
    === "Good"

        ``` js
        // AreYouSureButton.js
        export default function AreYouSureButton({...})
        ```

    === "Bad"
        ``` js
        // AreYouSureButton.js
        export default function Modal({...})
        ```

### Frontend Custom Hooks
All custom hooks should have `use` as prefix. Refer to the original [documentation](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) for the source of this coding standard.

### Frontend Props
Usually there are 2 main reason as to why a react component is divided into 2 reasons: readability - by splitting the code into subcomponents, and reusability - to be able to reuse components.

#### Generic Reused Component
For reuse component, always use generic variable name in the component, but the props passing should solve this.

???+ example "Props with different name to the variable value it was assigned to"
    ```js
    // AreYouSureButton.js
    export default function AreYouSureButton({
        title = 'Are you sure?',
        description = 'Are you sure you want to do this?',
        action,
        actionParameter = [],
        buttonProps = {},
        children,
    }) { ... }

    // Some other file that will use this
    <AreYouSureButton
        buttonProps={{}}
        description={
            'You are about to submit a review. Upon submission of a review, you will lose the ability to edit your review. If you have to edit a review, you will have to contact the coordinator of this unit.'
        }
        action={handleSubmit}
    >
    Submit
    </AreYouSureButton>
    ```
    As you can see from this one, `action` is just the action to be executed by the modal when a the confirm button is pressed. However, the function name that was passed to a prop is called `handleSubmit`. The reason why `action` does not have to be named `handleSubmit` because you could have times where you might want to pass `handleDelete` or something else.

#### Specific Context Component
There are times where context is very important or when components are only divided for readability, but not for the purpose of reusability.

???+ Example "Props with Almost same name to the variable it was assigned to"
    ```js
    const DocumentViewer = ({
        documents = [],
        course_id = null,
        review_id = null,
        eocBeingViewed = null,
        isReviewer = false,
        isReadOnly = false,
    }) => {...}

    // Being used in another file
    <DocumentViewer
        course_id={course?._id}
        review_id={review?._id}
        documents={course?.documents}
        eocBeingViewed={eocGeneralAndSpecific}
        isReviewer
        isReadOnly={isReadOnly}
    />
    ```
    As you can see from here, the name of the props being passed is almost the same name as the variable it was being assigned to.


#### Oversplitting or Too Dry
As much as you want to have "DRY" (Dont Repeat Yourself) code, if it interferes with the readability of the code and adds more line of code instead of reducing, then it is not worth even splitting it.

In majority of cases, splitting is correctly, but be mindful especially because once you split the code, it may become less flexible.

???+ Example "Oversimplified Code"
    Let say I have a function that needs to be executed twice for two different context.

    ```js
    const someFunction = (requiredParam, optionalParam="optional") => ... // Maybe DB operation

    // Correct way
    someFunction("some value1")
    someFunction("some value2","some options")

    // Overly simplified code
    [
        {requiredParam: "some value1"}, 
        {requiredParam: "some value2", optionalParam:"some options"}
    ].forEach(({requiredParam,optionalParam})=> someFunction(requiredParam,optionalParam) )
    ```
    At this example, the "correct way" has been executed twice, but the code that follows "DRY" has more lines of code and is more complex. The only time the "DRY" code is accepted is if you need to call this function, enormous amount of times (maybe around 4 or more times. Use with discretion). 
    
#### Utils
If you have functions that you think are too generic, but it can be used for many situation depending on context. Put it in the `utils` folder.

#### _id Suffix
`_id` suffix is a standard of Mongo Object ID. This codebase uses Pascal Case for all cases, so using `_id` is an exception of the rule which indicates that this is a mongo Object ID.

???+ alert "CourseID and course_id"
    This is one of the pitfalls of coding standard that needs to be resolved. Currently `courseID` means differently in different context:

    - routing - this corresponds to `course_id`
    - anywhere else - this corresponds to `courseID` the unit code of the course.

Furthermore, `_id` fields in the backend are treated as objects. So, if you need to compare IDs, refer [here](https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings).

