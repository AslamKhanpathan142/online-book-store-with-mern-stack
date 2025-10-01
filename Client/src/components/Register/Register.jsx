// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.dispatchEvent(new Event("auth"));
        navigate("/UserProfile");
      } else {
        toast.error(data.message);
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.register}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join our community of book lovers</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
              <div className={styles.registerIllustration}>
                <div className={styles.illustration}>
                  <i className="fas fa-book-reader"></i>
                </div>
                <h2>Start Your Reading Journey</h2>
                <p>
                  Join thousands of readers who discover new books every day
                </p>
              </div>

              <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.name && (
                    <span className={styles.errorText}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-phone"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={errors.phone ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className={errors.password ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.password && (
                    <span className={styles.errorText}>{errors.password}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={
                        errors.confirmPassword ? styles.errorInput : ""
                      }
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className={styles.errorText}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.registerBtn}
                  disabled={isSubmitting}
                >
                  <>
                    <i className="fas fa-user-plus"></i>
                    Create Account
                  </>
                </button>

                <div className={styles.loginLink}>
                  Already have an account? <Link to="/login">Sign In</Link>
                </div>
              </form>
            </div>

            <div className={styles.features}>
              <h3>Why Join Us?</h3>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-book"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Access to 50,000+ Books</h4>
                    <p>Discover books from all genres and authors</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-tags"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Exclusive Deals</h4>
                    <p>Get special discounts and early access to sales</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Free Shipping</h4>
                    <p>Free delivery on orders over $25</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Personalized Recommendations</h4>
                    <p>Get book suggestions based on your preferences</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>AI-Powered Book Suggestions</h4>
                    <p>
                      Discover books tailored to your interests using
                      intelligent AI recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
