import React from 'react';
import New from "./lists/new";
import Lists from "./lists/lists";

function Tasks(props) {
    return (
        <>
            <New/>
            <Lists/>
        </>
    );
}

export default Tasks;