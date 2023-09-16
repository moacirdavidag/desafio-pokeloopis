import React from 'react';
import './style.css';

export const Input = ({valueInput, setInputValue, keyDownEvent, corDeFundo}) => {
  return (
    <input type="text" value={valueInput} onChange={e => {
        setInputValue(e.target.value);
    }} 
    onKeyDownCapture={e => {
        keyDownEvent(e)
    }}
    className={`input`}
    style={{background: corDeFundo}}
    />
  )
}
