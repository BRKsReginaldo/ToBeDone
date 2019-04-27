import React from 'react';
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'

const Icon = ({className, strokeWidth}) => (
    <svg className={"circular " + className}>
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
    </svg>
);

export const StyledIcon = styled(Icon)`
  animation: rotate 2s linear infinite;
  height: ${props => props.width};
  width: ${props => props.width};
  position: relative;
  
  .path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #33a9ff;
  }
  
  
  @keyframes rotate{
    100% {
      transform: rotate(360deg);
    }
  }
    
  @keyframes dash{
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
`;

StyledIcon.defaultProps = {
    width: '100px',
    strokeWidth: 5
};

const StyledPageLoader = styled.div`
  width: 100%;
  text-align: center;
  ${props => props.marginTop && css`
    margin-top: 150px;
  `}
`;

StyledPageLoader.propTypes = {
    marginTop: PropTypes.bool
};

StyledPageLoader.defaultProps = {
    marginTop: true
};

function PageLoader(props) {
    return (
        <StyledPageLoader {...props}>
            <StyledIcon/>
        </StyledPageLoader>
    );
}

PageLoader.propTypes = {
    marginTop: PropTypes.bool
};

export default PageLoader;