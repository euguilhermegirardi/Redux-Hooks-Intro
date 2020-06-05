import { createStore, applyMiddleware } from 'redux';
// applyMiddleware = function the intercept every single action that we create using dispatch method.
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// function counterReducer(state = 0, action) {
//   if (action.type === 'INCREMENT') {
//     return state + 1;
//   }

//   if (action.type === 'DECREMENT') {
//     return state - 1;
//   }

//   return state;
// };

// function todosReducer(state = [], action) {
//   switch(action.type) {
//     case 'CREATE_TODO':
//       return state.concat([action.payload]);

//     case 'DELETE_TODO':
//       return state.filter((item, index) => index !== action.id);

//     case 'UPDATE_TODO':
//       return state.map((item, index) => index === action.id ? action.payload : item );

//     default:
//       return state;
//   }
// };

function reducer(state = { loading: false, data: null, error: null }, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload };

    case 'FETCH_ERROR':
      return { loading: false, error: action.payload };

    case 'FETCH_LOADING':
      return { loading: true };

    default:
      return state;
  }
};

const store = createStore(
  // combineReducers({
  //   todos: todosReducer,
  //   counter: counterReducer
  // }),
  reducer,
  applyMiddleware(logger, thunk)
);

// subscribe(listener) - Adds a change listener...
// ...It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.
store.subscribe(() => {
  // You may then call getState() to read the current state tree inside the callback.
  console.log('state has changed', store.getState());
});

// store.dispatch({ type: 'CREATE_TODO', payload: 'Learn React' });
// store.dispatch({ type: 'CREATE_TODO', payload: 'Learn Vue' });
// store.dispatch({ type: 'CREATE_TODO', payload: 'Learn Angular' });

// store.dispatch({ type: 'DELETE_TODO', id: 2 });

// store.dispatch({ type: 'UPDATE_TODO', id: 0, payload: 'Learn Node.js' });

// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'INCREMENT' });

store.dispatch((dispatch) => {
  dispatch({ type: 'FETCH_LOADING' });

  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
    .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
});

export default store;
