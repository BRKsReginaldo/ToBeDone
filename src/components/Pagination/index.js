import React, {useCallback} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {get} from 'lodash'
import {media} from "../../helpers/style";
import {Button} from "@material/react-button";

const PaginationStyle = styled.div`
  margin: 30px auto;
  width: 95%;
  text-align: center;
  
  ${media.phone`
    width: 90%;
  `}
  
  ${media.tablet`
    width: 40%;
  `}
  
  ${media.desktop`
    width: 400px;
  `}
  
  ${media.largeDesktop`
    width: 500px;
  `}
`;

function Pagination({cursorState, cursor}) {
    const [page, setPage] = cursorState;

    const nextPage = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        setPage(get(cursor, 'nextPageToken'))
    }, [cursor, setPage]);

    return (
        <PaginationStyle>
            {get(cursor, 'nextPageToken', false) && (
                <Button
                    onClick={nextPage}>
                    Ver Mais
                </Button>
            )}
        </PaginationStyle>
    );
}

Pagination.propTypes = {
    cursorState: PropTypes.array,
    cursor: PropTypes.object
};

export default Pagination;