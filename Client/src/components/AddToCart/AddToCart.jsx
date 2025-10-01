// AddToCart.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AddToCart.module.css";
import { useOutletContext } from "react-router-dom";

const AddToCart = () => {
  const {
    showAllBook,
    showCartItems,
    showCart,
    AddToCart,
    deleteAddToCart,
    bookUserOrder,
  } = useOutletContext();

  useEffect(() => {
    showCart();
  }, []);
  return (
    <div className={styles.cart}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.subtitle}>
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {showCartItems.length === 0 ? (
        /* Empty Cart */
        <section className={styles.emptyCart}>
          <div className={styles.container}>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIcon}>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any books to your cart yet.</p>
              <Link to="/Allbooks" className={styles.continueShopping}>
                <i className="fas fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Cart with Items */
        <>
          <section className={styles.cartContent}>
            <div className={styles.container}>
              <div className={styles.cartLayout}>
                {/* Cart Items */}
                <div className={styles.cartItems}>
                  <div className={styles.cartHeader}>
                    <span>Product</span>
                    <span>Price</span>
                    <span>Category</span>
                    <span>Action</span>
                    <span>Buy Now</span>
                  </div>
                 
                  {showCartItems?.map((item) => (
                    <div key={item._id} className={styles.cartItem}>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemImage}>
                          <img
                            src={`${import.meta.env.VITE_API_URL}${item.items?.imageURL}`}
                            alt={item.items?.title || 'Not Book Available'}
                          />
                        </div>
                        <div className={styles.itemDetails}>
                          <h3>{item.items?.title || 'Not Book Available' }</h3>
                          <p>{item.items?.author}</p>
                          <span className={styles.itemCategory}>
                            {item.items?.category}
                          </span>
                        </div>
                      </div>

                      <div className={styles.itemPrice}>
                        ${item.items?.price}
                      </div>
                      <div className={styles.itemTotal}>
                        {item.items?.category}
                      </div>

                      <div className={styles.itemActions}>
                        <button
                          onClick={() => deleteAddToCart(item._id)}
                          className={styles.removeBtn}
                          aria-label="Remove item"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className={styles.itemActions}>
                        <button
                          onClick={() => bookUserOrder(item.items._id)}
                          className={styles.removeBtn}
                          aria-label="Remove item"
                          style={{ color: "green", backgroundColor: "#8bbd86" }}
                        >
                          <i className="fa-solid fa-shop"></i>
                        </button>
                      </div>
                    </div>
                  )) || <h1>Book is Not Available</h1>}
              
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Books */}
          <section className={styles.recommendedSection}>
            <div className={styles.container}>
              <h2>You Might Also Like</h2>
              <div className={styles.recommendedBooks}>
                {showAllBook.slice(-3).map((book) => (
                  <div key={book._id} className={styles.recommendedBook}>
                    <div className={styles.bookImage}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${book.imageURL}`}
                        alt={book.title}
                      />
                    </div>
                    <div className={styles.bookInfo}>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <div className={styles.bookPrice}>${book.price}</div>
                      <button
                        className={styles.addBtn}
                        onClick={() => AddToCart(book._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AddToCart;
