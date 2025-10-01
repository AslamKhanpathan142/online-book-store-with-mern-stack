// AllBooks.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AllBooks.module.css";
import { useOutletContext } from "react-router-dom";


const AllBooks = () => {
  const { showAllBook, AddToCart } = useOutletContext();
  const [filteredBooks, setFilteredBooks] = useState(showAllBook);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Fiction", label: "Fiction" },
    { value: "Mystery", label: "Mystery" },
    { value: "Science Fiction", label: "Science Fiction"},
    { value: "Fantasy", label: "Fantasy" },
    { value: "Classic", label: "Classic" },
    { value: "Memoir", label: "Memoir" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Psychology", label: "Psychology" },
    { value: "Dystopian", label: "Dystopian" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Programming", label: "Programming" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Finance", label: "Finance" },
    { value: "History", label: "History" },
    { value: "Spiritual Fiction", label: "Spiritual Fiction" }
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...showAllBook];

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [showAllBook, selectedCategory, searchQuery]);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className={styles.allBooks}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>All Books</h1>
          <p className={styles.subtitle}>
            Discover our complete collection of {showAllBook.length} books
          </p>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersContainer}>
            {/* Search */}
            <div className={styles.searchBox}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by title, author, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className={styles.resultsInfo}>
        <div className={styles.container}>
          <p>
            Showing {showAllBook.length} of {filteredBooks.length} books
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className={styles.booksSection}>
        <div className={styles.container}>
          {showAllBook.length > 0 ? (
            <div className={styles.booksGrid}>
              {filteredBooks.map((book) => (
                <div key={book._id} className={styles.bookCard}>
                  <div className={styles.bookImage}>
                    <img src={`${import.meta.env.VITE_API_URL}${book.imageURL}`}
                      alt={book.title}
                    />
                    <div className={styles.bookOverlay}>
                      {/* <Link to={`/book/${book.id}`} className={styles.quickViewBtn}>
                        <i className="fas fa-eye"></i> Quick View
                      </Link> */}
                      <button className={styles.wishlistBtn}>
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                    <div className={styles.bookBadge}>{book.category}</div>
                  </div>
                  <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookAuthor}>{book.author}</p>
                    <div className={styles.bookMeta}>
                      <div className={styles.rating}>
                        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.price}>${book.price}</div>
                    </div>
                    <p className={styles.bookDescription}>{book.description}</p>
                    <button
                      className={styles.addToCartBtn}
                      onClick={() => AddToCart(book._id)}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <i className="fas fa-book-open"></i>
              <h3>No books found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllBooks;
