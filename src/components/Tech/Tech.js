import React from 'react';
import './Tech.css';
import LandingTitle from '../LandingTitle/LandingTitle';

const Tech = () => {
  return (
    <section
      className="tech"
      id="tech">
      <LandingTitle>Технологии</LandingTitle>
      <div className="tech__content">
        <div className="tech__about">
          <h3 className="tech__about-title">7 технологий</h3>
          <p className="tech__about-paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className="tech__technologies-list">
          <li className="tech__technology-item">
            <p className="tech__technology-name">HTML</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">CSS</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">JS</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">React</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">Git</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">Express.js</p>
          </li>
          <li className="tech__technology-item">
            <p className="tech__technology-name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Tech;
