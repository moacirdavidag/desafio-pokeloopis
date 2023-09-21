import styled from "styled-components";

export const GameConfigButton = styled.button`
    width: 80px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${({disabledStyle}) => disabledStyle ? "#ffb300" : "#d47107"};
    color: ${({disabledStyle}) => disabledStyle ? "#FFFFFF" : "#955107"};
    font-size: 28px;
    border-radius: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 15px;
    &:hover {
        background-color: orange;
    }
`;


