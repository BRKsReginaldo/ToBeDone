import {prefixActions, reducerFactory} from "../../helpers/redux";
import {simpleUpdate} from "../../helpers/reducers";
import {simpleAction, simpleActionCreator} from "../../helpers/actions";
import {listTaskLists} from "../../services/taskListsService";

const initialState = {
    taskLists: null,
    loading: false
};

const actions = prefixActions('task-lists', {
    SET_TASK_LISTS: 'set-task-lists',
    SET_LOADING: 'set-loading'
});

const handlers = {};

handlers[actions.SET_TASK_LISTS] = (state, {payload}) => {
    if (!state.taskLists) return {
        ...state,
        taskLists: payload
    };

    const items = state.taskLists.items.concat(payload.items);

    const taskLists = {
        ...payload,
        items
    };

    return {
        ...state,
        taskLists
    }
};

handlers[actions.SET_LOADING] = simpleUpdate('loading');

const setTaskLists = simpleAction(actions.SET_TASK_LISTS);

const setLoading = simpleAction(actions.SET_LOADING);

const fetchTasks = (parameters = {}, dispatch) => Promise.resolve(setLoading(true, dispatch))
    .then(() => listTaskLists(parameters))
    .then(response => response.result)
    .then(result => setTaskLists(result, dispatch))
    .then(() => setLoading(false, dispatch))
    .catch(e => console.log(e));

export const actionCreators = {
    setTaskLists: simpleActionCreator(setTaskLists),
    fetchTasks: simpleActionCreator(fetchTasks)
};

export default reducerFactory(initialState, handlers);