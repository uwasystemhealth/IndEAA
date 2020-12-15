# Developer Documentation
This is the documentation for developer used to maintain this software.

## Tech Stack

### Frontend - Nextjs/React
React is a UI library in JavaScript that utilizes the power of Client-Side Rendering (CSR) for Single Page Application (SPA). It makes development easier by using the concept of component modularisation.

Nextjs is a library on top of React that a lot of extra features for React. However, it may have some difficulty when it comes to server-side rendering. Hence, will be under consideration.

### Frontend + Backend Integration - Feathers-Redux
Redux is a state management library for React that handles high-level state management that is separate from the structure 

Feathers-redux is a library that maps the Feathers API to Redux reducers to abstract base HTTP calls to function calls in order to sync the state of the frontend, and the data stored in the backend.

More in the [official documentation](https://github.com/feathersjs-ecosystem/feathers-redux), and more info specific to the IndEAA project [here](/developer/feathers_redux/).
### Backend - Feathersjs/Express
Express is a library on Nodejs (a platform to run JavaScript outside of the browser) to easily create HTTP servers.

Feathersjs is a wrapper for application in Express, essentially to make development easier by loosely enforcing developers on creating RESTFul API (following uniformity of HTTP methods). It makes development easier by making route to database call uniform.

### Database - Mongoose/MongoDB
MongoDB will be used for its loosely defined and flexible data structure. Mongoose will be used to enforce some schema to control the shape of the data.

### Deployment - Docker
Docker will be used to orchestrate the frontend and the backend into two main containers as well as to host a temporary database for development.

https://stackoverflow.com/questions/51011552/mongodb-on-with-docker-failed-to-connect-to-server-localhost27017-on-first-c