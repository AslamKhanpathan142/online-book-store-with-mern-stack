// Home.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useOutletContext } from "react-router-dom";
import homeImg from '/books-stack-realistic.png'
import feed from '/feed.jpg'
import feed2 from '/feed2.jpg'

const Home = () => {
  const { showAllBook, AddToCart } = useOutletContext();

  function findCategory(category) {
    const filteredCat = showAllBook.filter((book) => book.category == category);
    return filteredCat.length;
  }

  const categories = [
    { name: "Fiction", icon: "fas fa-book", count: findCategory("Fiction") },
    { name: "Mystery", icon: "fas fa-search", count: findCategory("Mystery") },
    {
      name: "Science Fiction",
      icon: "fas fa-rocket",
      count: findCategory("Science Fiction"),
    },
    {
      name: "Biography",
      icon: "fas fa-user",
      count: findCategory("Biography"),
    },
    {
      name: "Self-Help",
      icon: "fas fa-hands-helping",
      count: findCategory("Self-Help"),
    },
    {
      name: "History",
      icon: "fas fa-landmark",
      count: findCategory("History"),
    },
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Discover Your Next <br />{" "}
              <span className={styles.highlight}>Favorite Book</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Explore our curated collection of the finest literature from
              around the world. Find your next adventure today.
            </p>
            <div className={styles.heroActions}>
              <Link to="/Allbooks" className={styles.primaryBtn}>
                Explore Books
              </Link>
              <Link to="/AIBookReader" className={styles.secondaryBtn}>
                Read with AI
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingBook}>
              <img
                src={homeImg}
                alt="Featured Book"
              />
            </div>
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement1}></div>
              <div className={styles.floatingElement2}></div>
              <div className={styles.floatingElement3}></div>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Explore Categories</h2>
            <p>Discover books from your favorite genres</p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <div key={index} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <i className={category.icon}></i>
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} books</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Featured Books</h2>
            <p>Bestsellers everyone is talking about</p>
          </div>
          <div className={styles.booksGrid}>
            {showAllBook.slice(-3).map((book) => (
              <div key={book._id} className={styles.bookCard}>
                <div className={styles.bookImage}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${book.imageURL}`}
                    alt={book.title}
                  />
                  <div className={styles.bookOverlay}>
                  </div>
                  <div className={styles.bookBadge}>{book.category}</div>
                </div>
                <div className={styles.bookInfo}>
                  <h3>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  <div className={styles.bookMeta}>
                    <div className={styles.rating}>
                      <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.price}>${book.price}</div>
                  </div>
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => AddToCart(book._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.seeMore}>
            <Link to="/Allbooks" className={styles.seeMoreBtn}>
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>What Our Readers Say</h2>
            <p>Don't just take our word for it</p>
          </div>
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>
                  "This is the best online bookstore I've ever used. The
                  selection is amazing and delivery is always fast! I've
                  discovered so many new authors through NexusReads."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src={feed2}
                  alt="Sarah Johnson"
                />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Book Club President</p>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>
                  "The recommendations are always spot on. I've discovered so
                  many new authors through NexusReads. Their customer service is
                  exceptional and the book quality is always top-notch."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src={feed}
                  alt="Michael Chen"
                />
                <div>
                  <h4>Michael Chen</h4>
                  <p>Avid Reader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2>Stay Updated</h2>
            <p>
              Subscribe to our newsletter for the latest releases and exclusive
              deals
            </p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" />
              <button className={styles.primaryBtn}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
