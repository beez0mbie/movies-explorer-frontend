import React from 'react';
import './LandingTitle.css';

const LandingTitle = (props) => {
  return <h2 className="landing-title">{props.children}</h2>;
};

export default LandingTitle;
