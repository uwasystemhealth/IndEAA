# Transport / Integration Layer - Feathers-Redux
This is the technology used to sync/transfer data from client to server by abstracting HTTP calls to function calls.

Keywords:

- Dispatch - the action to modify the state/store
- Reducers - group of functions that has a determines a specific action to modify state
- State/Store - state/store management structure for data that is accessible through a (Data) Provider

## Typical File Structure
This shows the typical file structure in the client folder.
```bash
client
├── middleware # contains all about middleware on data transport. Code running before main execution of transport
├── actions # contains all function regarding on functions that modifies the state/store by dispatching a change of state (reducer)
├── reducers # contains all function regarding on functions that modifies the state/store (called by action)
├── store # contains all about middleware on data transport. Code running before main execution of transport (creates store with reducer and middlewares)
│
├── feathersClient.js # This can be embedded in `app.js`, but this contains connection parameters to integrate Feathers with redux
```

## Redux Developer Tools
Whenever working with this, ensure that you have the Redux Developer tools installed which will ultimately help in debugging state related problems.

## Setup codes


```js
// ======= reducers/index.j s=======
// This is where you will combine both custom and feathers reducers

import { combineReducers } from 'redux';

export default function (reduxifiedServices) {
  return combineReducers({
    users: reduxifiedServices.users.reducer,
    todo: reduxifiedServices.todo.reducer
  });
}

// ======= middleware/index.js =======
// This is a configuration for all the middleware for Redux

import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
// import { routerMiddleware } from 'react-router-redux';
// import { browserHistory } from 'react-router';
import logger from './logger';

export default [
  reduxThunk, // Thunk middleware for Redux
  reduxPromiseMiddleware, // Resolve, reject promises with conditional optimistic updates
  // routerMiddleware(browserHistory), // !! IMPORTANT for location.href changes
  logger, // A basic middleware logger
];

// ======= store/index.js =======
// This is where both middleware and reducers are combined together to be created

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import middlewares from '../middleware';

export default function configureStore(reduxifiedServices, initialState) {
    // Engage the Chrome extension "Redux DevTools" if it is installed on the browser.
    // This extension watches reducers and logs their invocations, actions and changing state.
    // It caches activity so you can 'time travel' through state changes.
    // It runs in an extension reducing the size of your app bundle.
    // This interface can be left in prod bundles and the extension activated in the field as needed.
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-app-launcher-info-dialog
    const createStoreWithDevTools = (typeof window !== 'undefined' && window.devToolsExtension)
        ? window.devToolsExtension()(createStore) 
        : createStore

    const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStoreWithDevTools);

    return createStoreWithMiddlewares(rootReducer(reduxifiedServices), initialState);
}

// ======= feathersClient.js =======
// This is where feathers connection is establish
// This is also where the store is created

import configureStore from "../store"
import io from "socket.io-client"
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import Realtime from "feathers-offline-realtime"
import reduxifyServices, { getServicesStatus } from "feathers-redux"

// Configure Socket and Feathers Connection
export const socket = io(process.env.REACT_APP_BACKEND_URL});
export const feathersClient = feathers()
    .configure(socketio(socket));

// Configure Redux
export const services = reduxifyServices(feathersClient, ['users', 'message']); // Replace the array with the services name
const store = configureStore(services);
export default store;

// Configure realtime & connect it to services
const messages = feathersClient.service('/messages'); // Replace this with a specific service to configure realtime connection
const messagesRealtime = new Realtime(messages, { sort: Realtime.sort('text') });

messagesRealtime.on('events', (records, last) => {
  store.dispatch(services.messages.store({ connected: messagesRealtime.connected, last, records }));
});

// Enable realtime. It will start with a snapshot.
messagesRealtime.connect()
    .then(() => console.log('Realtime replication started'));
```

## Realtime Feathers Update Configuration
With Feathers, it could connect with various methods such as sockets. With sockets, it enables the update of the store in realtime.
See below for the configuration. More information can be seen in the [feathers-redux documentation](https://github.com/feathersjs-ecosystem/feathers-redux).

???+ info "Feathers Realtime Update Configuration"
    ```js

    // feathersClient.js
    // Configure Redux with Feathers
    export const serviceNames = [
        'users',
        'course-evaluation'
    ]
    export const rawServices = reduxifyServices(feathersClient, serviceNames,{
        idField: "_id", // This is to ensure that realtime update matching uses that attribute
    });

    // Realtime Feathers Update Confguration
    serviceNames.forEach(serviceName=>{
        const currentSelectedService = feathersClient.service(`/${serviceName}`)

        currentSelectedService.on('created', (data) => {
            store.dispatch(rawServices[serviceName].onCreated(data));
        })
        currentSelectedService.on('updated', (data) => {
            store.dispatch(rawServices[serviceName].onUpdated(data));
        })
        currentSelectedService.on('patched', (data) => {
            store.dispatch(rawServices[serviceName].onPatched(data));
        })
        currentSelectedService.on('removed', (data) => {
            store.dispatch(rawServices[serviceName].onRemoved(data));
        })
    })

    ```
    Pay attention, that this configuration allows realtime update for each of the services. If you don't need for each services, you can change `serviceNames` to a list of services that you would want to receive update.

    

## Using Feathers Query and Actions
There are two types of services that can be fetched from `feathersClient.js`:
 - `rawServices` this are services that are not binded to the state which means that calls made from here will not affect the state
 - `services` (binded with dispatch)

??? Info "How is this configured"
    ```js
    import reduxifyServices, { getServicesStatus, bindWithDispatch } from "feathers-redux"
    import configureStore from "../store"

    ...

        // Configure Redux
    export const serviceNames = [
        'users',
        'course-evaluation'
    ]
    export const rawServices = reduxifyServices(feathersClient, serviceNames);

    const store = configureStore(rawServices);
    export default store;

    export const services = bindWithDispatch(store.dispatch, rawServices)

    ```

Most of the time, you will want to update the state upon entering a page. Be wary, to select only data that you think you will need at this time.

???+ Example "Administrator View Fetching data of users and course name"
    useEffect(() => {
        services.users.find()
        services["course-evaluation"].find({
            query: {
                $select: ["courseId"]
            }
        })
    }, [])

??? alert "Note: Feathers Routes does not work with Camel Casing"
    Feathers routes does not work with camel casing because of the convention of how internet URLs are not case sensitive, hence the use of kebab case.

    This is very important to know!!! Because services name will be named after it.



## Using and Creating Custom Action and Reducer
An example of a custom action and reducer is authentication. There are mainly 3 parts that you need to do to create a custom action and reducer for state management, see below as follow.

In the `AuthGuard` component, the following useEffect code is used to prevent accessing of page without Authentication.

```js
// Store Actions and Redux
import { useDispatch } from "react-redux"
import { signIn } from "actions/auth"

...

    useEffect(() => {
        // Authentication Setup
        dispatch(signIn())
    }, [])
```
`useDispatch` is a function that takes a function (`signIn` is a function that returns a function with setup action dispatch)

???+ Example "1. signIn Action"
    ```js
    export const signIn = () => async (dispatch, getState) => {
      try {
          const loginDetails = await feathersClient.reAuthenticate()
          return dispatch({
              type: "SIGNIN_SUCCESS",
              ...loginDetails
          })
      }
      catch (error) {
          // Cant Authenticate
          return dispatch({
              type: "SIGNIN_ERROR",
              error
          })
      }
    }
    ```
    This will contain intermediary action prior to modification of a state via the reducer.

???+ Example "2. Authentication Reducer"
    ```js
    const initState = {
      user: null,
      error: null
    }

    export const authenticateReducer = (state = initState, action) => {
        switch (action.type) {
            case "SIGNIN_SUCCESS":
                return {
                    ...state,
                    user: action.user
                }
            case "SIGNIN_ERROR":
                return {
                    ...state,
                    error: action.error
                }
            case "SIGNOUT_SUCCESS":
                return initState
            default:
                return state
        }
    }
    ```
    This will outline actions towards the state. Note that any action that calls a reducer, all of its parameters are passed to the action object. Hence `action.type`, `action.user`, and `action.error`. The correct names that follows from the action should be followed.

???+ Example "3. Combine Reducer"
    ```js hl_lines="4 10"
    import { combineReducers } from 'redux';

    // Custom Reducers
    import { authenticateReducer } from "reducers/auth"

    export default function (reduxifiedServices) {
      return combineReducers({
        users: reduxifiedServices.users.reducer,
        "course-evalution": reduxifiedServices["course-evaluation"].reducer,
        auth: authenticateReducer
      });
    }
    ```

    This combines the existing reducer that is setup to the new reducer created.

## Fetching data from State
An example is getting the current user that has login

???+ Example "Getting User Name"
    ```js
    import { useSelector } from "react-redux"

    ...

    const user = useSelector(state => state.auth.user)

    console.log(user.name)
    // This will print out the name of the user or it will error (if user is null)
    ```

    Accessing the user can be accessed from the reducer auth. The auth reducer has access to its state which just happens to store the current user login.