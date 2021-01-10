# Notifications with Redux Saga

Redux Saga is a library that aims to make application side effects (more info in the [documentation](https://redux-saga.js.org/)) mainly for the following:

- easier to manage after effects
- better error handling

In IndEAA, this is used for notifications handling whenever a feathers request finished.

## How does it work? (Simplified)
As you know, whenever you are dispatching an action to the store, Redux goes through the middleware that is setup with it.

??? info "Logger"
    This is how the logger functions to know which action has been dispatched.

Redux Saga essentially takes advantage of that to know which action has been dispatched, and from there, it can do whatever.

## Configuration

Here are the steps to configure Redux Saga. Assuming you have already installed it

???+ example "1. Add Saga Middleware"
    For IndEAA, this can be found in `client/middleware/index.js`
    ```js
    import createSagaMiddleware from "redux-saga"
    ...
    // This needs to be activated after applying it to the storep
    export const sagaMiddleware = createSagaMiddleware()
    ...
    export default[
        ...
         sagaMiddleware,
        ...
    ]
    ```

???+ example "2. Run the middleware after the store has been created"
    For IndEAA, this can be found in `client/store/feathersClient.js`
    ```js
    import { sagaMiddleware } from "../middleware"
    import feathersSaga from "./feathersSaga" // This will be all your custom Saga Actions
    ...

    const store = configureStore(rawServices);

    // Run all Saga Middlewares
    sagaMiddleware.run(feathersSaga)
    ```

With these two steps, Redux Saga is ready for action! See more below on how to use it.

## What do you have to do to use it?
To use it, there are two main steps below

### Defining a Saga Action
To use it, you have to define a Saga action in `client/store/feathersSaga.js`

The most common structure will look something like this:

???+ Example "Common Structure"
    ```js
    yield takeEvery(services.users.types.SERVICES_USERS_CREATE_FULFILLED, function* (action) {
            const { payload } = action
            // Payload is the dispatch action items
            yield put(addNotificationMessageParams({
                message: `User (${payload.email}) has been successfully created`
            }))
        });
    ```
    The first parameter is the "type". When dealing with feathers types please refer to information [here ](https://github.com/feathersjs-ecosystem/feathers-redux#documentation-reduxifyservices)where types and Redux Saga is mentioned. The second parameter is a generator callback function (it uses `yield` instead of `return`)

    `put` is a custom dispatch action for Redux Saga

#### Available Types in Feathers-Redux

Referring to the Feathers Redux documentation, the main types are as follows

- PENDING
- FULFILLED
- REJECTED


### Service Calls
When the saga action is defined, service calls that can have notifications are easy peasy.

???+ Example "Example of Service Call that will have notification"
    ```js
    // Found in the User Creation Modal
      const createUser = async (email) => {
        try {
            const response = await services.users.create({ email })
            closeModal();
            setCurrentUserSelected(response.value)
        } catch (error) {
            // Handled by Redux Saga
        }
    }
    ```
    It is a simple as that. Do your call, and of course catch the error (because what if you have BadRequest or lost internet connection). You don't need to do anything after the error unless you want to, but essentially Redux Saga will handle error reporting for you when you setup that.

## Notications Component

The notification component uses a library called [notistack](https://github.com/iamhosseindhv/notistack) which enables notification to be stacked. Check out the documentation for more information.

### Setup

There is 1 library component imported (`SnackbarProvider`), and 1 custom component `Notification` created to make this happen. See `components/Layout/ContentWrapper.js`


#### SnackbarProvider

It can be seen that the components are wrapped:
```
const ContentWrapper = ({ children }) => (
<SnackbarProvider maxSnack={3}>
    <Notification></Notification>
   ...
</SnackbarProvider>
)
```

This is essentially a component that uses context to display notifications which means that this is separate from the Redux.

??? info "Context and Redux"
    Context is almost the same thing as redux, both are used for state management, but context is built in React. The point of this information is to point that the `SnackbarProvider` data store/context is different from the Redux Store. Hence, it needs to be reconciled or coordinated when we used them both.

#### Notification Custom Component
The notification component, is special such that it doesn't render anything. It is simply a shell component that enables code to run upon modification of the notification redux store in order to modify the notistack context data store.

??? info "Why are we using Redux for managing notification"
    notistack library only enables `enqueueSnackbar` either using class-component or functional component by hooks. These hooks cannot be called whenever using Redux Saga, because those are not components.

