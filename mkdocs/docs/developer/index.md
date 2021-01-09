# Developer Documentation

This is the documentation for developer used to maintain this software.

## Tech Stack

### Frontend

#### Core Frontend Technologies

##### ReactJS

[**React documentation**](https://reactjs.org/docs/getting-started.html)  
React is a UI library in JavaScript that utilizes the power of Client-Side Rendering (CSR) for Single Page Application (SPA). It makes development easier by using the concept of component modularisation.

##### NextJS

[**Nextjs documentation**](https://nextjs.org/docs)  
Nextjs is a library on top of React that a lot of extra features for React. However, it may have some difficulty when it comes to server-side rendering. Hence, will be under consideration.

#### Component Libraries

##### Material-UI

[**Material-UI documentation**](https://material-ui.com/getting-started/usage/)  
Material-UI is a component library for React which provides a large number of pre-made components styled in accordance with the [material design](https://material.io/design) standard. This allows for rapid development as you don't have to focus on design considerations as much.

##### Material Kit React

[**Material Kit React documentation**](https://demos.creative-tim.com/material-kit-react/#/documentation/tutorial)  
Material Kit React is built on top of Material UI and provides extra theming for components. This will further accelerate development and provide a consistent look and feel to the design.

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
