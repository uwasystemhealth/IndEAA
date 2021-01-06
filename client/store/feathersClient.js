import configureStore from "../store"
import io from "socket.io-client"
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import Realtime from "feathers-offline-realtime"

import reduxifyServices, { getServicesStatus, bindWithDispatch } from "feathers-redux"
// Configure Feathers
export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
    transports: ['websocket'],
    forceNew: true
});
// console.log(socket)
export const feathersClient = feathers()
feathersClient.configure(socketio(socket,
    {
        timeout: 15000 // Increase timeout (defualt 5000ms)
    }
));
feathersClient.configure(feathers.authentication())


// Configure Redux
export const serviceNames = [
    'users',
    'course-evaluation'
]
export const rawServices = reduxifyServices(feathersClient, serviceNames);

const store = configureStore(rawServices);
export default store;

export const services = bindWithDispatch(store.dispatch, rawServices)




// Configure realtime & connect it to services

// const messages = feathersClient.service('/messages');
// const messagesRealtime = new Realtime(messages, { sort: Realtime.sort('text') });

// messagesRealtime.on('events', (records, last) => {
//   store.dispatch(services.messages.store({ connected: messagesRealtime.connected, last, records }));
// });

// Enable realtime. It will start with a snapshot.

// messagesRealtime.connect()
//     .then(() => console.log('Realtime replication started'));