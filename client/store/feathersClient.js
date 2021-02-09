import configureStore from '../store';
import { sagaMiddleware } from '../middleware';
import feathersSaga from './feathersSaga';
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';

import reduxifyServices, { bindWithDispatch } from 'feathers-redux';

// Configure Socket Configuration


export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
    transports: ['websocket'],
    forceNew: true
});


// Configure Feathers with Socket Connection
export const feathersClient = feathers();
feathersClient.configure(socketio(socket,
    {
        timeout: 15000 // Increase timeout (defualt 5000ms)
    }
));
feathersClient.configure(feathers.authentication());


// Configure Redux with Feathers
export const serviceNames = [
    'users',
    'course-evaluation',
    'review'
];

// Used for Services that are not affecting Redux
export const rawServices = (serviceName) => feathersClient.service(serviceName);
export const reduxifiedServices = reduxifyServices(feathersClient, serviceNames,{
    idField: '_id', // This is to ensure that realtime update matching uses that attribute
});
const store = configureStore(reduxifiedServices);
export default store;

// Run all Saga Middlewares
sagaMiddleware.run(feathersSaga);

// Bind Services with Redux Dispatch calls
export const services = bindWithDispatch(store.dispatch, reduxifiedServices);


// Realtime Feathers Update Confguration
serviceNames.forEach(serviceName=>{
    const currentSelectedService = feathersClient.service(`/${serviceName}`);

    currentSelectedService.on('created', (data) => {
        store.dispatch(reduxifiedServices[serviceName].onCreated(data));
    });
    currentSelectedService.on('updated', (data) => {
        store.dispatch(reduxifiedServices[serviceName].onUpdated(data));
    });
    currentSelectedService.on('patched', (data) => {
        store.dispatch(reduxifiedServices[serviceName].onPatched(data));
    });
    currentSelectedService.on('removed', (data) => {
        store.dispatch(reduxifiedServices[serviceName].onRemoved(data));
    });
});

// Configure realtime & connect it to services

// const messages = feathersClient.service('/messages');
// const messagesRealtime = new Realtime(messages, { sort: Realtime.sort('text') });

// messagesRealtime.on('events', (records, last) => {
//   store.dispatch(services.messages.store({ connected: messagesRealtime.connected, last, records }));
// });

// Enable realtime. It will start with a snapshot.

// messagesRealtime.connect()
//     .then(() => console.log('Realtime replication started'));