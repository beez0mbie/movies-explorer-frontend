import React from 'react';
import LandingTitle from '../LandingTitle/LandingTitle';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section
      className="about-project"
      id="about-project">
      <div className="about-project__landing-title">
        <LandingTitle>О проекте</LandingTitle>
      </div>
      <div className="about-project__two-columns">
        <article className="about-project__column">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </article>
        <article className="about-project__column">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </article>
      </div>
      <article className="about-project__progress">
        <div className="about-project__progress-part about-project__progress-part_1">
          <p className="about-project__part-week about-project__part-week_black">1 неделя</p>
          <p className="about-project__part-desc">Back-end</p>
        </div>
        <div className="about-project__progress-part about-project__progress-part_4">
          <p className="about-project__part-week about-project__part-week_gray">4 недели</p>
          <p className="about-project__part-desc">Front-end</p>
        </div>
      </article>
    </section>
  );
};

export default AboutProject;
