
import { combineReducers } from 'redux';

// Custom Reducers
import { authenticateReducer } from "reducers/auth"

export default function (reduxifiedServices) {
  return combineReducers({
    users: reduxifiedServices.users.reducer,
    todo: reduxifiedServices.todo.reducer,
    auth: authenticateReducer
  });
}

/*
To use (from https://redux.js.org/api/combinereducers)

import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})

console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }

*/