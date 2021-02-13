import styled from 'styled-components';
import propTypes from 'prop-types';
import db from '../../../db.json';

const Button = styled.button`
    width: 100%;
    height: 50px;
    background-color: ${db.theme.colors.primary};
    font-size: 18px;
    font-weight: bold;
    color: white;
    border-radius: 5px;
    border-color: transparent;
    text-transform: uppercase;
    transition: .3s;
    line-height: 1;
    cursor: pointer;

    &:disabled {
      background-color: grey;
      cursor: not-allowed
    }

    &:hover {
        opacity: .5;
    }
`;

Button.propTypes = {
  type: propTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: propTypes.node.isRequired,
};

export default Button;
