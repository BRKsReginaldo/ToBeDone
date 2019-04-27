import {useEffect, useReducer, useMemo} from 'react'
import useTasksReducer, {initialState, actionCreators} from './useTasks.reducer'
import {bindLocalActions} from "../helpers/redux";

export default function useTasks({taskList}) {
    const [state, dispatch] = useReducer(useTasksReducer, initialState);

    const actions = useMemo(
        () => bindLocalActions(
            actionCreators,
            dispatch
        ),
        [
            dispatch
        ]
    );

    useEffect(() => {
        actions.fetchTasks({tasklist: taskList.id})
    }, [actions, taskList.id]);

    return [state, actions, dispatch]
}