import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { interceptor } from 'apis/axiosClient';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authReducer'],
};

const rootReducer = combineReducers({
  authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

interceptor(store);

export const persistor = persistStore(store);

export default store;
