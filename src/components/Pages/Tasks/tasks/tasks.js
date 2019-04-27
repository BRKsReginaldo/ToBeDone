import React, {useContext} from 'react';
import {get} from 'lodash'
import useTasks from "../../../../hooks/useTasks";
import TaskListContext from "../../../../contexts/TaskListContext";
import PageLoader from "../../../PageLoader";
import styled from 'styled-components'
import Task from "./task";
import {formatTasks} from "../../../../helpers/structures";
import List from "@material/react-list";
import EmptyTasks from "./empty";

export const createTask = (taskItem) => <Task key={taskItem.id} task={taskItem}/>;

const TasksStyle = styled.div`
  .task {
    user-select: none;
  }
  
  .task--is-child {
    padding-left: 10px;
  }
  
  .task__title {
    outline: none;
  }
`

const Loader = () => <PageLoader marginTop={false}/>

export function ListTasks({items}) {
    return (
        <List>
            {items.length ? items : <EmptyTasks/>}
        </List>
    )
}

function Tasks() {
    const {taskList} = useContext(TaskListContext);
    const [state] = useTasks({taskList});
    const {tasks, loading} = state;

    if (!get(tasks, 'items', false)) return <Loader/>;

    const items = formatTasks(get(tasks, 'items', [])).map(createTask);

    return (
        <TasksStyle>
            <ListTasks items={items}/>
            {loading && <Loader/>}
        </TasksStyle>
    )
}

export default Tasks;