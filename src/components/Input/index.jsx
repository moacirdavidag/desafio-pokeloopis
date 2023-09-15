import React from 'react';
import './style.css';

export const Input = ({valueInput, setInputValue, keyUpEvent, corDeFundo}) => {
  return (
    <input type="text" value={valueInput} onChange={e => {
        setInputValue(e.target.value);
    }} 
    onKeyUp={e => {
        keyUpEvent(e)
    }}
    className={`input`}
    style={{background: corDeFundo}}
    />
  )
}
