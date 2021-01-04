# Developer Documentation

This is the documentation for developer used to maintain this software.

## Tech Stack

### Frontend + Backend Integration - Feathers-Redux

[**Redux documentation**](https://redux.js.org/)  
Redux is a state management library for React that handles high-level state management that is separate from the structure

[**Feathers-redux documentation**](https://github.com/feathersjs-ecosystem/feathers-redux)  
[**IndEAA specific feathers-redux information**](/developer/feathers_redux/)  
Feathers-redux is a library that maps the Feathers API to Redux reducers to abstract base HTTP calls to function calls in order to sync the state of the frontend, and the data stored in the backend.

### Backend - Feathersjs/Express

[**Express documentation**](https://expressjs.com/en/api.html)  
Express is a library on Nodejs (a platform to run JavaScript outside of the browser) to easily create HTTP servers.

[**Feathersjs documentation**](https://docs.feathersjs.com/)  
Feathersjs is a wrapper for application in Express, essentially to make development easier by loosely enforcing developers on creating RESTFul API (following uniformity of HTTP methods). It makes development easier by making route to database call uniform.

### Database - Mongoose/MongoDB

[**MongoDB documentation**](https://docs.mongodb.com/)  
MongoDB will be used for its loosely defined and flexible data structure.

[**Mongoose documentation**](https://mongoosejs.com/docs/guide.html)  
Mongoose will be used to enforce some schema to control the shape of the data.

### Deployment - Docker

[**Docker documentation**](https://docs.docker.com/)  
Docker will be used to orchestrate the frontend and the backend into two main containers as well as to host a temporary database for development.

https://stackoverflow.com/questions/51011552/mongodb-on-with-docker-failed-to-connect-to-server-localhost27017-on-first-c
