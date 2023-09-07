import { createStore, combineReducers } from 'redux';
import { simpleRouterReducer } from 'react-redux-simple-router';

const rootReducer = combineReducers({
  router: simpleRouterReducer,
  // add any other reducers here
});

const store = createStore(rootReducer);