import {prefixActions, reducerFactory} from "../helpers/redux";
import {simpleUpdate} from "../helpers/reducers";
import {simpleAction, simpleActionCreator} from "../helpers/actions";
import {listTasks} from "../services/tasksService";

export const initialState = {
    tasks: null,
    readyToFetch: false,
    loading: true
};

const actions = prefixActions('tasks', {
    SET_TASKS: 'set-tasks',
    SET_READY_TO_FETCH: 'set-ready-to-fetch',
    SET_LOADING: 'set-loading'
});

const handlers = {};

handlers[actions.SET_TASKS] = simpleUpdate('tasks');
handlers[actions.SET_READY_TO_FETCH] = simpleUpdate('readyToFetch');
handlers[actions.SET_LOADING] = simpleUpdate('loading');

const setTasks = simpleAction(actions.SET_TASKS);
const setReadyToFetch = simpleAction(actions.SET_READY_TO_FETCH);
const setLoading = simpleAction(actions.SET_LOADING);

const fetchTasks = ({tasklist, parameters = {}}, dispatch) => Promise.resolve(setLoading(true, dispatch))
    .then(() => listTasks(tasklist, parameters))
    .then(response => response.result)
    .then(result => setTasks(result, dispatch))
    .then(() => setLoading(false, dispatch))
    .catch(e => console.log(e));

export const actionCreators = {
    setTasks: simpleActionCreator(setTasks),
    setReadyToFetch: simpleActionCreator(setReadyToFetch),
    setLoading: simpleActionCreator(setLoading),
    fetchTasks: simpleActionCreator(fetchTasks, {tasklist: null})
};

export default reducerFactory(initialState, handlers)