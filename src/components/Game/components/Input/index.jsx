import React from 'react';
import './style.css';

export const Input = ({ valueInput, setInputValue, keyDownEvent, background }) => {
  return (
    <input type="text" value={valueInput}
      onChange={e => {
        setInputValue(e.target.value);
      }}
      autoFocus="true"
      onKeyDownCapture={e => {
        keyDownEvent(e)
      }}
      className={`input`}
      style={{ background }}
    />
  )
}
