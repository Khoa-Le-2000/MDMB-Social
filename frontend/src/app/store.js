import { interceptor } from 'apis/axiosClient';
import rootReducer from 'app/reducers';
import { omit } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const filterTransform = createTransform(
  // inbound
  (inboundState, key) => {
    return inboundState
      ? omit(inboundState, ['login', 'register'])
      : inboundState;
  },
  // outbound
  (outboundState, key) => {
    return outboundState
      ? omit(outboundState, ['login', 'register'])
      : outboundState;
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [filterTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  // middlewares.push(createLogger());
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

interceptor(store);

export const persistor = persistStore(store);

export default store;
