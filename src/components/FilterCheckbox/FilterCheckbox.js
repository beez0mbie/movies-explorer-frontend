import React, { useState, useEffect } from 'react';
import Switch from '../Switch/Switch';
import './FilterCheckbox.css';

const FilterCheckbox = ({ isChecked, handleCheckbox }) => {
  return (
    <div className="filter">
      <Switch
        onChange={handleCheckbox}
        isChecked={isChecked}
      />
      <p className="filter__desc">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
