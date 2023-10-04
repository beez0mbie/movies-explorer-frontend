import React from 'react';
import './AboutMe.css';
import photo from '../../images/Custo.jpg';
import LandingTitle from '../LandingTitle/LandingTitle';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section
      className="about-me"
      id="about-me">
      <div className="about-me__landing-title">
        <LandingTitle>Студент</LandingTitle>
      </div>
      <div className="about-me__container">
        <figcaption className="about-me__photo-container">
          <img
            className="about-me__photo"
            src={photo}
            alt="Моё фото"
          />
        </figcaption>
        <article className="about-me__content">
          <h2 className="about-me__title">Виталий</h2>
          <h3 className="about-me__subtitle">Фронтенд&#8209;разработчик, 33 года</h3>
          <p className="about-me__paragraph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
          </p>
        </article>
        <div className="about-me__github">
          <a
            href="https://github.com/beez0mbie"
            target="blank"
            className="about-me__github-link">
            Github
          </a>
        </div>
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
