import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware } from './middleware';
import reducer from './reducer';

const getMiddleware = () => {
  return applyMiddleware(promiseMiddleware);
}

const store = createStore(reducer, composeWithDevTools(getMiddleware()))

export default store;
