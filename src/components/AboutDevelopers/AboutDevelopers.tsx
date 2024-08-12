import styles from "./AboutDevelopers.module.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';

import linkEdinIcon from "../../images/icons/icons8-linkedin-blue.svg";
import gitHub from "../../images/icons/icons8-github-black.svg";
import { useEffect } from "react";

export const AboutDevelopers = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  
  
  useEffect(() => {
    const teamMembers = document.querySelectorAll(`.${styles.teamMember}`);
    const screenWidth = window.innerWidth;

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          if (Array.from(teamMembers).includes(entry.target)) {
            const index = Array.from(teamMembers).indexOf(entry.target);

            if (screenWidth >= 1200) {

              if (index % 3 === 0) {
                entry.target.classList.add(styles.slideInLeft);
              } else if (index % 3 === 1) {
                entry.target.classList.add(styles.slideInBottom);
              } else {
                entry.target.classList.add(styles.slideInRight);
              }

            } else if (screenWidth >= 640) {

              if (index % 2 === 0) {
                entry.target.classList.add(styles.slideInLeft);
              } else {
                entry.target.classList.add(styles.slideInRight);
              }
            } else {
              entry.target.classList.add(styles.slideInBottom);
            }

          } else {
            entry.target.classList.add(styles.slideInLeft);
          }

          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    teamMembers.forEach(member => {
      observer.observe(member);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section className={styles.aboutDevelopers}>
      <h2 className={styles.teamTitle}>
        This project was developed by the international team of "Alpha Code Team"
      </h2>
      <h2 className={styles.languageTitle}>
        In this product, we spoke the language of Apple technology
      </h2>

      <div className={styles.team}>
        <div className={`${styles.teamMember} ${styles.teamMember0}`}>
          <h3 className={styles.teamName}>Ruslan Hnatyshyn</h3>
          <p className={styles.teamPosition}>Frontend Developer</p>
          <p className={styles.teamDescription}>developer of black humor</p>
          <div className={styles.teamLinks}>
            <a
              href="https://www.linkedin.com/in/%D1%80%D1%83%D1%81%D0%BB%D0%B0%D0%BD-%D0%B3%D0%BD%D0%B0%D1%82%D0%B8%D1%88%D0%B8%D0%BD-459445281/"
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/RuslanHnatyshyn"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>

        <div className={`${styles.teamMember} ${styles.teamMember1}`}>
          <h3 className={styles.teamName}>Vasyl Humen</h3>
          <p className={styles.teamPosition}>Frontend Developer</p>
          <p className={styles.teamDescription}>Developer of websites that your mouse can't resist</p>
          <div className={styles.teamLinks}>
            <a
              href="https://www.linkedin.com/in/vasya-humen-922077314"
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/HumenVAsya"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>


        <div className={`${styles.teamMember} ${styles.teamMember2}`}>
          <h3 className={styles.teamName}>Mariia Naichuk</h3>
          <p className={styles.teamPosition}>Team Lead</p>
          <p className={styles.teamDescription}>Full Snack Developer</p>
          <div className={styles.teamLinks}>
            <a
              href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin"
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/MariCodec"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>

        <div className={`${styles.teamMember} ${styles.teamMember3}`}>
          <h3 className={styles.teamName}>Oleksandr Kopaevych</h3>
          <p className={styles.teamPosition}>Tech Lead</p>
          <p className={styles.teamDescription}>Developer from God</p>
          <div className={styles.teamLinks}>
            <a
              href="https://www.linkedin.com/in/oleksandr-kopaievych-158318177/"
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/Oleksandr-kopaevich"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>

        <div className={`${styles.teamMember} ${styles.teamMember4}`}>
          <h3 className={styles.teamName}>Oleksandr Rusinka</h3>
          <p className={styles.teamPosition}>Frontend Developer</p>
          <p className={styles.teamDescription}>Deadline-Defying Developer</p>
          <div className={styles.teamLinks}>
            <a
              href=""
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/sa4ok-1"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>

        <div className={`${styles.teamMember} ${styles.teamMember5}`}>
          <h3 className={styles.teamName}>Yaroslav Leshchenko</h3>
          <p className={styles.teamPosition}>Frontend Developer</p>
          <p className={styles.teamDescription}>Pixel Ninja Developer</p>
          <div className={styles.teamLinks}>
            <a
              href="https://www.linkedin.com/in/yaroslav-leshchenko-73a554321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className={styles.linkedinLink}
            >
              <img src={linkEdinIcon} alt="LinkedIn Icon" className={styles.teamIconLinkEdin} />
            </a>

            <a
              href="https://github.com/YaroslavLeshchenko"
              target="_blank"
              className={styles.gitHubLink}
            >
              <img src={gitHub} alt="Git Hub Icon" className={styles.teamIconGitHub} />
            </a>
          </div>
        </div>
      </div>

      <h2 data-aos="fade-right" className={styles.ambitiousTitle}>
        We are a team of ambitious developers united by love for our craft
      </h2>
      <h2 data-aos="fade-right" className={styles.goalTitle}>
        We are united by the goal of creating the best product in the world
      </h2>
    </section>
  );
};
