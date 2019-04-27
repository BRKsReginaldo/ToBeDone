import React, {useCallback} from 'react';
import styled from 'styled-components'
import TextField, {Input} from "@material/react-text-field";
import useInput from "../../../../hooks/useInput";
import {media} from "../../../../helpers/style";

const CreateNewTaskStyle = styled.div`
  margin-top: 50px;
  text-align: center;
  
  .create-new-task__text-field {
    width: 95%;
  
    ${media.phone`
        width: 90%;
    `}
    
    ${media.tablet`
        width: 50%;
    `}
    
    ${media.desktop`
        width: 40%;
    `}
    
    ${media.largeDesktop`
        width: 500px;
    `}
  }
`;

function New(props) {
    const [inputProps, methods] = useInput('');

    const onSubmit = useCallback(event => {
        event.preventDefault()

        console.log(inputProps.value);

        methods.setValue('')

    }, [inputProps.value, methods]);

    return (
        <CreateNewTaskStyle>
            <form onSubmit={onSubmit}>
                <TextField
                    className="create-new-task__text-field"
                    label="Uma nova lista em mente ?">
                    <Input {...inputProps}/>
                </TextField>
            </form>
        </CreateNewTaskStyle>
    );
}

export default New;