
import { combineReducers } from 'redux';

export default function (reduxifiedServices) {
  return combineReducers({
    users: reduxifiedServices.users.reducer,
    todo: reduxifiedServices.todo.reducer
  });
}
