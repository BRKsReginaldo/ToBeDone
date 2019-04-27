import React from 'react';
import styled from 'styled-components'

const EmptyTasksStyle = styled.div`
  text-align: center;
`

function EmptyTasks(props) {
    return (
        <EmptyTasksStyle>
            <p>Parece que você ainda não criou nenhuma tarefa.</p>
            <div>que tal começar agora ?</div>
        </EmptyTasksStyle>
    );
}

export default EmptyTasks;