import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section>
      <h2>NotFound</h2>
      <Link to={'..'}>Go back</Link>
    </section>
  );
};

export default NotFound;
