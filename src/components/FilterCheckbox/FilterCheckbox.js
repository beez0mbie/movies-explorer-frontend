import React, { useState, useEffect } from 'react';
import Switch from '../Switch/Switch';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(
    () => JSON.parse(localStorage.getItem('filterCheckboxChecked')) || false,
  );
  useEffect(() => {
    localStorage.setItem('filterCheckboxChecked', JSON.stringify(isChecked));
  }, [isChecked]);
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
