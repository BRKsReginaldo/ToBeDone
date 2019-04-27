import {globalActions, prefixActions, reducerFactory} from "../../helpers/redux";
import {simpleUpdate} from "../../helpers/reducers";
import {simpleAction, simpleActionCreator} from "../../helpers/actions";

const initialState = {
    authenticated: false,
    loaded: false,
    user: null
};

const actions = prefixActions('auth', {
    SET_AUTHENTICATED: 'set-authenticated',
    SET_LOADED: 'set-loaded',
    SET_USER: 'set-user',
    SETUP_AUTH: 'setup-auth'
});


const handlers = {};

handlers[actions.SET_AUTHENTICATED] = simpleUpdate('authenticated');
handlers[actions.SET_LOADED] = simpleUpdate('loaded');
handlers[actions.SET_USER] = simpleUpdate('user');
handlers[actions.SETUP_AUTH] = (state, {payload: {user, authenticated}}) => ({
    ...state,
    loaded: true,
    user,
    authenticated
});

handlers[globalActions.SIGN_OUT] = () => ({
    ...initialState,
    loaded: true
});

const setAuthenticated = simpleAction(actions.SET_AUTHENTICATED);
const setLoaded = simpleAction(actions.SET_LOADED);
const setUser = simpleAction(actions.SET_USER);
const setupAuth = simpleAction(actions.SETUP_AUTH);

export const actionCreators = {
    setAuthenticated: simpleActionCreator(setAuthenticated),
    setLoaded: simpleActionCreator(setLoaded),
    setUser: simpleActionCreator(setUser),
    setupAuth: simpleActionCreator(setupAuth)
};

export default reducerFactory(initialState, handlers)