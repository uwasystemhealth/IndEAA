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
├── reducers # contains all function regarding on functions that modifies the state/store
├── store # contains all about middleware on data transport. Code running before main execution of transport (creates store with reducer and middlewares)
│
├── feathersClient.js # This can be embedded in `app.js`, but this contains connection parameters to integrate Feathers with redux
```

## Useful Codes


```js
// ======= reducers/index.j s=======

import { combineReducers } from 'redux';

export default function (reduxifiedServices) {
  return combineReducers({
    users: reduxifiedServices.users.reducer,
    todo: reduxifiedServices.todo.reducer
  });
}

// ======= middleware/index.js =======
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