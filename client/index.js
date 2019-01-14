import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchAllData, watchUsersData }  from './saga';
import { createLogger } from 'redux-logger';

import App from './components/App';
import reducers from './reducers';

const logger = createLogger({
    collapsed: true
  });

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(watchAllData);
sagaMiddleware.run(watchUsersData);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root'));


