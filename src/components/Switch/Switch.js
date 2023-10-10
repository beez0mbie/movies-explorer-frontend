import React from 'react';
import './Switch.css';

const Switch = ({ isChecked, onChange }) => {
  return (
    <label className="switch">
      <input
        className="switch__checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <span className="switch__slider"></span>
    </label>
  );
};

export default Switch;
