import {useCallback, useEffect, useState} from 'react'
import {useActions, useSelector} from "react-redux";
import {actionCreators} from "../store/reducers/taskLists";

export default function useTaskLists() {
    const {taskLists, loading} = useSelector(({taskLists}) => ({
        taskLists: taskLists.taskLists,
        loading: taskLists.loading
    }), []);

    const [maxResults, setMaxResults] = useState(20);
    const [pageToken, setPageToken] = useState(null);

    const fetchTasks = useActions(actionCreators.fetchTasks, []);
    const refetch = useCallback(() => {
        return fetchTasks({maxResults, pageToken})
    }, [maxResults, pageToken, fetchTasks]);

    useEffect(() => {
        fetchTasks({
            maxResults: maxResults,
            pageToken: pageToken
        })
    }, [fetchTasks, maxResults, pageToken]);

    return {
        taskLists,
        refetch,
        loading,
        pageToken: [pageToken, setPageToken],
        maxResults: [maxResults, setMaxResults],
    }
}