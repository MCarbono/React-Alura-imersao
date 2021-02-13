import styled from 'styled-components';
import propTypes from 'prop-types';

const InputBase = styled.input`
    width: 100%;
    background-color: transparent;
    border-color: transparent;
    margin-bottom: 5%;
    font-size: 14px;
    padding: 15px;
    color: ${({ theme }) => theme.colors.contrastText};
    outline: none;
`

export default function Input({ onChange, placeholder, ...props }){
    return(
        <>
           <InputBase
            placeholder={placeholder}
            onChange={onChange}   
            />  
        </>
    )
}

Input.defaultProps = {
    value: '',
}

Input.propTypes = {
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,

}