// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            {/* Brand Section */}
            <div className={styles.footerSection}>
              <div className={styles.brand}>
                <div className={styles.logo}>
                  <i className="fas fa-book-open"></i>
                  <span>NexusReads</span>
                </div>
                <p className={styles.tagline}>
                  Discover your next favorite book from our curated collection.
                </p>
                <div className={styles.socialLinks}>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Pinterest"
                  >
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Goodreads"
                  >
                    <i className="fab fa-goodreads-g"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Quick Links</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Allbooks">All Books</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Categories</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    Fiction
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    Mystery & Thriller
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    Science Fiction
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    Biography
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    Self-Help
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate("/Allbooks")}>
                    History
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Contact Info</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Book Street, Reading, RT 54321</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone"></i>
                  <span>(555) 123-4567</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope"></i>
                  <span>support@nexusreads.com</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-clock"></i>
                  <span>Mon-Fri: 9am-6pm, Sat: 10am-4pm</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              <p>&copy; 2023 NexusReads. All rights reserved.</p>
            </div>
            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className={styles.paymentMethods}>
              <i className="fab fa-cc-visa" title="Visa"></i>
              <i className="fab fa-cc-mastercard" title="Mastercard"></i>
              <i className="fab fa-cc-amex" title="American Express"></i>
              <i className="fab fa-cc-paypal" title="PayPal"></i>
              <i className="fab fa-cc-apple-pay" title="Apple Pay"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
