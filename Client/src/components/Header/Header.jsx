// components/Navbar/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ showCartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const update = () => setIsLoggedIn(!!localStorage.getItem("token"));

    // For cross-tab updates
    window.addEventListener("storage", update);
    // For same-tab updates (we will dispatch "auth")
    window.addEventListener("auth", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("auth", update);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <i className="fas fa-book-open"></i>
          <span>NexusReads</span>
        </Link>

        <div className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === "/" ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/Allbooks"
            className={`${styles.navLink} ${
              location.pathname === "/Allbooks" ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            Books
          </Link>
          <Link
            to="/about"
            className={`${styles.navLink} ${
              location.pathname === "/about" ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${styles.navLink} ${
              location.pathname === "/contact" ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>

        {isLoggedIn ? (
          <div className={styles.navActions}>
            <Link to="/AIBookReader" className={styles.searchBtn}>
              AI
            </Link>
            <Link to="/AddToCart" className={styles.cartBtn}>
              <i className="fas fa-shopping-cart"></i>
              <span className={styles.cartCount}>{showCartItems.length}</span>
            </Link>
            <Link to="/UserProfile" className={styles.profileBtn}>
              <i className="fas fa-user"></i>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/Register" className={styles.registerbtn}>
              Register
            </Link>
          </div>
        )}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
