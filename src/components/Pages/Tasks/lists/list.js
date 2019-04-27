import React from 'react';
import styled from 'styled-components'
import {media} from "../../../../helpers/style";
import Card, {CardActions, CardPrimaryContent} from "@material/react-card";
import {Headline6, Subtitle2} from "@material/react-typography";
import moment from 'moment'
import 'moment/locale/pt-br'
import TextField, {Input} from "@material/react-text-field";
import useInput from "../../../../hooks/useInput";
import Tasks from "../tasks/tasks";
import PropTypes from 'prop-types'
import TaskListContext from "../../../../contexts/TaskListContext";

moment.locale('pt-br');

const StyledTaskList = styled.div`
  flex-basis: 100%;
  overflow: hidden;
  width: 100%;
  margin: 15px auto 0;
  
  ${media.tablet`
    flex-basis: 50%;
    margin: 10px 10px 0;
  `}
  
  .tasklist__wrapper {
    height: 100%;
  }
  
  .tasklist__header {
    border-bottom: 1px solid #cecece;
  }
  
  .tasklist__title {
    padding-left: 10px;
    margin: 10px;
  }
  
  .tasklist__subtitle {
    padding-left: 15px;
    margin: 0 10px 10px;
  }
  
  .tasklist__actions {
    display: flex;
  }
  
  .tasklist__actions__text-field {
    flex: 1;
  }
  
  .tasklist__body {
    max-width: 100%;
    flex: 1;
  }
`;

function List({taskList}) {
    const [inputProps] = useInput('');

    return (
        <TaskListContext.Provider value={{
            taskList
        }}>
            <StyledTaskList>
                <Card className="tasklist__wrapper">
                    <CardPrimaryContent className="tasklist__header">
                        <div>
                            <Headline6 className="tasklist__title">{taskList.title}</Headline6>
                            <Subtitle2 className="tasklist__subtitle">
                                Ultima vez atualizado {moment(taskList.updated).fromNow()}
                            </Subtitle2>
                        </div>
                    </CardPrimaryContent>
                    <div className="tasklist__body">
                        <Tasks limit={10}/>
                    </div>
                    <CardActions className="tasklist__actions">
                        <TextField
                            className="tasklist__actions__text-field"
                            outlined
                            label="O que precisa ser feito ?">
                            <Input {...inputProps}/>
                        </TextField>
                    </CardActions>
                </Card>
            </StyledTaskList>
        </TaskListContext.Provider>
    );
}

List.propTypes = {
    taskList: PropTypes.object
};

export default List;