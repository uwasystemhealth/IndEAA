import configureStore from "../store"
import io from "socket.io-client"
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import Realtime from "feathers-offline-realtime"

import reduxifyServices, { getServicesStatus } from "feathers-redux"
// Configure Feathers
export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
    transports: ['websocket'],
    forceNew: true
});
console.log(socket)
export const feathersClient = feathers()
    .configure(socketio(socket));


// Configure Redux
export const services = reduxifyServices(feathersClient, ['users', 'todo']);

const store = configureStore(services);
export default store;


// Configure realtime & connect it to services

// const messages = feathersClient.service('/messages');
// const messagesRealtime = new Realtime(messages, { sort: Realtime.sort('text') });

// messagesRealtime.on('events', (records, last) => {
//   store.dispatch(services.messages.store({ connected: messagesRealtime.connected, last, records }));
// });

// Enable realtime. It will start with a snapshot.

// messagesRealtime.connect()
//     .then(() => console.log('Realtime replication started'));