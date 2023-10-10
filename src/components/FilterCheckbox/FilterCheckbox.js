import React, { useState } from 'react';
import Switch from '../Switch/Switch';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div className="filter">
      <Switch
        onChange={() => {
          setIsChecked((prev) => !prev);
        }}
        isChecked={isChecked}
      />
      <p className="filter__desc">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
