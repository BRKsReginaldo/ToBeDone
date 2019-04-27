import React from 'react';
import styled from 'styled-components'
import useTaskLists from "../../../../hooks/useTaskLists";
import PageLoader from "../../../PageLoader";
import List from "./list";
import {media} from "../../../../helpers/style";
import Pagination from "../../../Pagination";

const buildTaskList = taskList => <List key={taskList.id} taskList={taskList}/>;

const StyledTaskLists = styled.div`
  margin: 35px auto 0 auto;  
  width: 95%;
  display: flex;
  flex-direction: column;
  
  ${media.phone`
    width: 90%;
  `}
  
  ${media.tablet`
    width: 80%;
    flex-direction: row;
  `}
  
  ${media.desktop`
    width: 768px;
  `}
  
  ${media.largeDesktop`
    width: 900px;
  `}
`;

function Lists() {
    const {taskLists, pageToken, loading} = useTaskLists();

    if (!taskLists) return <PageLoader/>;

    const lists = taskLists.items.map(buildTaskList);

    return (
        <>
            <StyledTaskLists>
                {lists}
            </StyledTaskLists>

            {loading && <PageLoader marginTop={false}/>}

            <Pagination cursor={taskLists} cursorState={pageToken}/>
        </>
    )
}

export default Lists;