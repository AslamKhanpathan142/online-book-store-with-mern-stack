// About.js
import React from "react";
import styles from "./About.module.css";
import ceo from '/ceo.png'
import man2 from '/man.png'
import girl from '/girl.jpg'
import girl2 from '/girl2.jpg'
import bookStore from '/book.avif'
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const { showAllBook } = useOutletContext();
  const teamMembers = [
    {
      name: "Mo Aslam Khan",
      role: "Founder & CEO",
      image: ceo,
      bio: "Book enthusiast with a passion for technology and innovation in the publishing industry.",
    },
    {
      name: "Sophia Williams",
      role: "Head Curator",
      image: girl2,
      bio: "Former literary critic with an eye for hidden gems.",
    },
    {
      name: "David Wilson",
      role: "Operations Director",
      image: man2,
      bio: "Ensures your books arrive quickly and in perfect condition.",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: girl,
      bio: "Passionate about connecting readers with their next favorite book.",
    },
  ];

  const stats = [
    { number: showAllBook.length + "+", label: "Books Available" },
    { number: "120+", label: "Countries Served" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "15", label: "Years of Experience" },
  ];

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Our Story</h1>
            <p className={styles.heroSubtitle}>
              From a small bookstore to a global community of readers
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2>How It All Began</h2>
              <p>
                Founded in 2008, our bookstore started as a small passion
                project between friends who loved literature. What began as a
                modest storefront has now blossomed into a thriving online
                community serving book lovers across the globe.
              </p>
              <p>
                We believe that books have the power to transform lives, expand
                perspectives, and bring people together. That's why we're
                committed to curating a diverse collection of titles across all
                genres, ensuring there's something for every reader.
              </p>
              <div className={styles.mission}>
                <h3>Our Mission</h3>
                <p>
                  To foster a love of reading by making books accessible to
                  everyone, providing exceptional service, and creating a
                  community where readers can discover, share, and discuss their
                  passion for literature.
                </p>
              </div>
            </div>
            <div className={styles.storyImage}>
              <img
                src={bookStore}
                alt="Bookstore interior"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <i className="fas fa-book"></i>
              </div>
              <h3>Quality Selection</h3>
              <p>
                We carefully curate our collection to ensure the highest quality
                content from both established and emerging authors.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <i className="fas fa-heart"></i>
              </div>
              <h3>Passion for Reading</h3>
              <p>
                We're readers ourselves, and our recommendations come from
                genuine love and knowledge of literature.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <i className="fas fa-users"></i>
              </div>
              <h3>Community Focus</h3>
              <p>
                We believe in building a community where readers can connect,
                share, and grow together.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <i className="fa-solid fa-hexagon-nodes-bolt"></i>
              </div>
              <h3>AI-Powered Reading</h3>
              <p>
                Enhance your learning with AI that explains, summarizes, and
                guides you through every book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Meet Our Team</h2>
            <p>The passionate readers behind our bookstore</p>
          </div>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.socialLinks}>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Join Our Reading Community</h2>
            <p>
              Become part of our story and discover your next favorite book
              today
            </p>
            <div className={styles.ctaButtons}>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/Allbooks")}
              >
                Browse Books
              </button>
              <button className={styles.secondaryBtn}>
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
