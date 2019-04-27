import {simpleAction, simpleActionCreator} from "./actions";

export const bindLocalActions = (actions, dispatch) => Object.keys(actions).reduce((result, action) => {
    return {
        ...result,
        [action]: (...args) => Reflect.apply(actions[action], undefined, args)(dispatch)
    };
}, {});

export function prefixActions(prefix, actions, separator = '-') {
    return Object.keys(actions)
        .reduce(function(mappedActions, action) {
            return { ...mappedActions, [action]: [prefix, actions[action]].join(separator) };
        }, {});
}

export const globalActions = prefixActions('global', {
    SIGN_OUT: 'sign-out'
});

const signOut = simpleAction(globalActions.SIGN_OUT);

export const globalActionCreators = {
    signOut: simpleActionCreator(signOut)
};

export function reducerFactory(defaultState, handlers) {
    return (state = defaultState, action) => {
        const handler = handlers[action.type];

        if (action.type === globalActions.SIGN_OUT) {
            return handler ?
                handler(state, action) :
                defaultState
        }

        return handler ?
            handler(state, action) :
            state;
    };
}
