import React from 'react';
import {get} from 'lodash'
import {ListItem, ListItemText} from "@material/react-list";
import styled, {css} from 'styled-components'

const ListItemStyle = styled(ListItem)`
  ${props => props.isChild && css`
    padding-left: 30px!important;  
  `}
`;

function Task({task}) {
    const hasChilds = !!get(task, 'childTasks', []).length;

    return (
        <>
            <ListItemStyle isChild={!!task.parent} className="task">
                <ListItemText
                    className="task__title"
                    primaryText={get(task, 'title', 'some default string')}
                />

            </ListItemStyle>
            {hasChilds && task.childTasks.map(childTask => <Task task={childTask}/>)}
        </>
    );
}

export default Task;