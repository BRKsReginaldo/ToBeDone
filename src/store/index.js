import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import reducers from './reducers'

function buildRootReducer(allReducers) {
    return combineReducers(
        allReducers
    )
}

export default function configureStore(initialState = {}) {
    const enhancedCompose = window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') &&
    process.env.NODE_ENV !== 'production' ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) :
        compose;

    const createStoreWithMiddleware = enhancedCompose(
        applyMiddleware(
            thunk,
            createLogger({
                collapsed: true
            })
        )
    )(createStore)

    const allReducers = buildRootReducer(reducers)

    return createStoreWithMiddleware(allReducers, initialState)
}